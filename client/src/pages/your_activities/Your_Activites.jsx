import Cards from "../../components/cards/Cards";
import "./your_activities.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Your_Activites() {
  const [cards, setCards] = useState([]);
  const [bn, setBn] = useState("Enroll");
  // no activity
  const [nact, setNact] = useState(false);
  const [current, setCurrent] = useState("ALL");

  const [user, setUser] = useState("");

  const fetchCards = async () => {
    let res1 = await axios.get("/event/recommended");
    let res2 = await axios.get("/volunteer/myEvents");
    console.log(res1.data.length);
    if (res1.data.length === 0 && res2.data.length === 0) {
      setNact(true);
    }
    if (current == "ENROLLED") res1 = res2;
    res1.data.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.date) - new Date(b.date);
    });
    setCards(res1.data);
  };
  useEffect(() => {
    fetchCards();
    setUser(JSON.parse(localStorage.getItem("user")).data.user.name);
  }, []);

  const reRender = () => {
    fetchCards();
  };

  const handleEnrolled = async (e) => {
    e.preventDefault();
    try {
      setCurrent("ENROLLED");
      const res = await axios.get("/volunteer/myEvents");
      res.data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      });
      setCards(res.data);
      setBn("Unenroll");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAll = async (e) => {
    e.preventDefault();
    try {
      setCurrent("ALL");
      const res = await axios.get("/event/recommended");

      console.log(res);
      res.data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      });
      setCards(res.data);
      setBn("Enroll");
    } catch (err) {
      console.log(err);
    }
  };

  if (!nact) {
    return (
      <>
        <div className="heading">
          <span className="act">Activities Coming Up:</span>
          <span className="all" onClick={handleAll}>
            {" "}
            ALL{" "}
          </span>
          <span className="enrol" onClick={handleEnrolled}>
            {" "}
            ENROLLED{" "}
          </span>
          <span className="act username">Hello {user}!</span>
        </div>
        <div className="your_activities">
          <Cards onActivity={reRender} cards={cards} bn={bn} />
        </div>
      </>
    );
  } else {
    return (
      <div className="message">
        <h1 className="big"> No Activities to show</h1>
        <h3 className="small">
          {" "}
          Have you registered for volunteering activities yet? If no, please
          register asap!
        </h3>
      </div>
    );
  }
}
