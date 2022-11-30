import time
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request

import pandas as pd
import geopandas as gpd
from shapely.geometry import LineString, Point
import osmnx  as ox
import networkx as nx

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# fetching graph
graph = ox.load_graphml("./data/ottawa_bike_elevation.graphml")

# define some edge impedance function here
def impedance(length, grade):
    penalty = grade**2
    return length * penalty

# add impedance and elevation rise values to each edge in the projected graph
# use absolute value of grade in impedance function if you want to avoid uphill and downhill
for _, _, _, data in graph.edges(keys=True, data=True):
    data["impedance"] = impedance(data["length"], data["grade"])
    data["rise"] = data["length"] * data["grade"]

# Reproject the graph
graph_proj = ox.project_graph(graph)

# Get the GeoDataFrame
edges = ox.graph_to_gdfs(graph_proj, nodes=False)

# Get CRS info UTM
CRS = edges.crs

def shortest_path_map(origin, destination, network = 'bike'):

    # Reproject all data
    origin_proj = origin.to_crs(crs=CRS)
    destination_proj = destination.to_crs(crs=CRS)
    
    # routes of shortest path
    routes = gpd.GeoDataFrame()
    
    # Get nodes from the graph
    nodes = ox.graph_to_gdfs(graph_proj, edges=False)
    
     # Iterate over origins and destinations
    for oidx, orig in origin_proj.iterrows():
        
        # Find closest node from the graph --> point = (latitude, longitude)
        closest_origin_node = ox.nearest_nodes(graph_proj, orig.geometry.x, orig.geometry.y)
        
        # Iterate over targets
        for tidx, target in destination_proj.iterrows():
            # Find closest node from the graph --> point = (latitude, longitude)
            closest_target_node = ox.nearest_nodes(graph_proj, target.geometry.x, target.geometry.y)
            
            # Check if origin and target nodes are the same --> if they are --> skip
            if closest_origin_node == closest_target_node:
                print("Same origin and destination node. Skipping ..")
                return
            
            # Find the shortest path between the points
            route = nx.shortest_path(graph_proj, 
                                     source=closest_origin_node, 
                                     target=closest_target_node, weight='impedance')
        
            # Extract the nodes of the route
            route_nodes = nodes.loc[route]
        
            # Create a LineString out of the route
            path = LineString(list(route_nodes.geometry.values))
        
            # Append the result into the GeoDataFrame
            routes = routes.append([[path]], ignore_index=True)

    # Add a column name
    routes.columns = ['geometry']
    
    # Set geometry
    routes = routes.set_geometry('geometry')
        
    # Set coordinate reference system
    routes.crs = nodes.crs

    #Storing the path node coords in an array
    path_nodes = []
    for node_id in route:
        temp = graph.nodes(data=True)[node_id]
        path_nodes.append([temp["y"], temp["x"]])

    return path_nodes

@app.route('/path')
@cross_origin()
def get_current_time():
    
    origin = list(map(float, request.args.get("origin").split(',')[::-1]))
    destination = list(map(float, request.args.get("destination").split(',')[::-1]))

    print("data - ", origin, " ", destination)

    originPoint = Point(origin[0], origin[1])
    destinationPoint = Point(destination[0], destination[1])

    origin =  gpd.GeoDataFrame(columns = ['name', 'geometry'], crs = 4326, geometry = 'geometry')
    origin.at[0, 'geometry'] = originPoint

    destination =  gpd.GeoDataFrame(columns = ['name', 'geometry'], crs = 4326, geometry = 'geometry')
    destination.at[0, 'geometry'] = destinationPoint


    return jsonify({'path': shortest_path_map(origin, destination, 'bike')})