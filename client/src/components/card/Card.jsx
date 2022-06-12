import "./card.css";
import play from "../assets/play.jpeg";
import audio from "../assets/audio.jpg";
import translate from "../assets/translationbg.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  DrawerBody,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  useDisclosure,
  Stack,
  Text,
  Avatar,
} from "@chakra-ui/react";

export default function Card({ card, bn, onActivity }) {
  const message =
    "Your registration has not been approved by the admin yet. Please bear with us :)";
  const [pending, setPending] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [pic, setPic] = useState(`${card.type}`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(card.name);

  // console.log(bn);

  useEffect(() => {
    const fetchEnrolled = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      var str = bn;
      setButtonName(str);
      // console.log(buttonName);
      // console.log(bn);

      console.log(pic);
      console.log(name);

      if (user) {
        const status = user.data.user.approval;
        console.log(user.data.user.approval);
        if (status == "pending") {
          setPending(true);
        }
      }
    };
    fetchEnrolled();
  }, []);

  const handleDetails = async (e) => {
    console.log(card);
    onOpen();
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    console.log("heyy");

    if (bn == "Enroll") {
      try {
        const res = await axios.post(`/enrollment/enroll/${card._id}`, {});

        bn = "Unenroll";
        console.log(res);
        onActivity();
      } catch (err) {
        const errorCode = err.response.status;
        // if(errorCode == "403") {
        //   setPending(true);
        // }
        console.log(err.response.status);
      }
    } else {
      try {
        const res = await axios.post(`/enrollment/unenroll/${card._id}`, {});

        bn = "Enroll";
        console.log(res);
        onActivity();
      } catch (err) {
        const errorCode = err.response.status;
        // if(errorCode == "403") {
        //   setPending(true);
        // }
        console.log(err.response.status);
      }
    }
  };

  if (card.type == "audio") {
    return (
      <div className="card">
        <img className="cardImg" src={audio} alt="" />
        <div className="cardInfo">
          <div className="cardCats">
            <span className="cardCat">
              {new Date(card.startsAt).toDateString()}
            </span>
            <span className="cardCat">{card.Location}</span>
          </div>
          <span className="cardTitle">{card.name}</span>
          <hr />
          <div className="buttons">
            <button className="badge fill" onClick={handleDetails}>
              {" "}
              Details{" "}
            </button>
            <button className="badge sec fill" onClick={handleEnroll}>
              {" "}
              {bn}{" "}
            </button>
            {pending && <span className="tooltiptext">{message}</span>}
          </div>
        </div>
        <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>DETAILS OF EVENT</DrawerHeader>
            <DrawerBody>
              <Stack>
                <div>{card.name}</div>
                <div>
                  Address: {card.address}, {card.Location}
                </div>
                <div>Date: {new Date(card.date).toDateString()}</div>
                <div>Time: {new Date(card.startsAt).toTimeString()}</div>
                <div>Duration: {card.duration} Hours</div>
                <div>Description: {card.description}</div>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else if (card.type == "translate") {
    return (
      <div className="card">
        <img className="cardImg" src={translate} alt="" />
        <div className="cardInfo">
          <div className="cardCats">
            <span className="cardCat">
              {new Date(card.startsAt).toDateString()}
            </span>
            <span className="cardCat">{card.Location}</span>
          </div>
          <span className="cardTitle">{card.name}</span>
          <hr />
          <div className="buttons">
            <button className="badge fill" onClick={handleDetails}>
              {" "}
              Details{" "}
            </button>
            <button className="badge sec fill" onClick={handleEnroll}>
              {" "}
              {bn}{" "}
            </button>
            {pending && <span className="tooltiptext">{message}</span>}
          </div>
        </div>
        <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>DETAILS OF EVENT</DrawerHeader>
            <DrawerBody>
              <Stack>
                <div>{card.name}</div>
                <div>
                  Address: {card.address}, {card.Location}
                </div>
                <div>Date: {new Date(card.date).toDateString()}</div>
                <div>Time: {new Date(card.startsAt).toTimeString()}</div>
                <div>Duration: {card.duration} Hours</div>
                <div>Description: {card.description}</div>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else {
    return (
      <div className="card">
        <img className="cardImg" src={play} alt="" />
        <div className="cardInfo">
          <div className="cardCats">
            <span className="cardCat">
              {new Date(card.startsAt).toDateString()}
            </span>
            <span className="cardCat">{card.Location}</span>
          </div>
          <span className="cardTitle">{card.name}</span>
          <hr />
          <div className="buttons">
            <button className="badge fill" onClick={handleDetails}>
              {" "}
              Details{" "}
            </button>
            <button className="badge sec fill" onClick={handleEnroll}>
              {" "}
              {bn}{" "}
            </button>
            {pending && <span className="tooltiptext">{message}</span>}
          </div>
        </div>
        <Drawer onClose={onClose} isOpen={isOpen} size={`xs`}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>DETAILS OF EVENT</DrawerHeader>
            <DrawerBody>
              <Stack>
                <div>{card.name}</div>
                <div>
                  Address: {card.address}, {card.Location}
                </div>
                <div>Date: {new Date(card.date).toDateString()}</div>
                <div>Time: {new Date(card.startsAt).toTimeString()}</div>
                <div>Duration: {card.duration} Hours</div>
                <div>Description: {card.description}</div>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}
