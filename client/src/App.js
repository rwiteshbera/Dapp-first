import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import abi from "./utils/ContractABI.json";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import "./App.css";
import etherMessage from "./images/gif-ether.gif";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [inputText, setInputText] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  // const contractAddress = process.env.CONTRACT_ADDRESS;
  const contractAddress = "0x124623e5F558776dDe8dd173D248f1226a9D86c6";
  const contractABI = abi.abi;

  // Check if metamask is connected or not
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      }

      // Check if we are authorized to access user's wallet
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Connect with wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Set Data in blockchain
  const setData = async (newData) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const SimpleStorageContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        await SimpleStorageContract.setData(newData);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Data in blockchain
  const getResult = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const SimpleStorageContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let messages = await SimpleStorageContract.getData();
        let messageCleaned = [];

        messages.forEach((MSG) => {
          messageCleaned.push({
            address: MSG.sender,
            message: MSG.message,
          });
        });

        setAllMessages(messageCleaned.reverse());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const textChange = (e) => {
    setInputText(e.target.value);
  };
  const sendData = async () => {
    await setData(inputText);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // Continously updating result
  useEffect(() => {
    getResult();
  });

  return (
    <>
      <div className="container">
        <div className="left">
          <img src={etherMessage} className="gif-img" alt="ethereum-chat" />
        </div>
        <div className="right">
          {/* <input type="text" onChange={textChange} /> */}
          <Form.Label>Message</Form.Label>
          <Form className="form">
            <Form.Control
              as="textarea"
              id="textarea"
              aria-label="With textarea"
              onChange={textChange}
              value={inputText}
              placeholder="Enter a message"
            ></Form.Control>
          </Form>

          <div className="button-group">
            {!currentAccount && (
              <Button
                variant="primary"
                className="connect"
                onClick={connectWallet}
              >
                Connect with Metamask
              </Button>
            )}
            <Button variant="warning" onClick={sendData}>
              Send
            </Button>
          </div>
          <div className="message-box">
            {allMessages.map((MSG, index) => {
              return (
                <div key={index} className="single-msg">
                  <div id="single-msg-address">
                    <b>From: </b>
                    {MSG.address}
                  </div>
                  <div id="single-msg-message">{MSG.message}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
