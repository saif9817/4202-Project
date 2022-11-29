import { connect } from "react-redux";
import { clearStartEnd as clearStartEndAction } from "../../store/actions";
import { IState } from "../../store/models";
import "./Header.css";
import { CgPlayListSearch } from "react-icons/cg";

const Header = ({ clearStartEnd }: any) => {
  return (
    <div className="header__container">
      <span>Ottawa</span>
      <button
        style={{
          fontSize: "2rem",
          verticalAlign: "middle",
          position: "absolute",
          right: "1rem",
          top: "15px",
        }}
        onClick={() => console.log("hello")}
      >
        Calculate Route
      </button>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  const { search } = state;
  return search;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearStartEnd: () => dispatch(clearStartEndAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
