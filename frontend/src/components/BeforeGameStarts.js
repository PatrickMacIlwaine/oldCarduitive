import React from "react";
import ReadyButton from "./ReadyButton";
import Countdown from "./Countdown";
import CopyLink from "./CopyLink";
import Level from "./Level";




function BeforeGameStarts({roomData, handleCopyClick, isCopied, ready, show1, show2, show3, handleClickReady}) {
  return (
    <>
    <Level  won = {roomData.won} lost = {roomData.lost} level = {roomData.level} /> 
    <CopyLink won = {roomData.won} lost = {roomData.lost}  gameStarted = {roomData.gameStarted} handleCopyClick = {handleCopyClick} isCopied = {isCopied} />
    <ReadyButton won = {roomData.won} lost = {roomData.lost}  ready = {ready} gameStarted = {roomData.gameStarted} handleClickReady = {handleClickReady}/>
    <Countdown won = {roomData.won} lost = {roomData.lost}  gameStarted={roomData.gameStarted} show1={show1} show2={show2} show3={show3} />
    </>
  );
}
export default BeforeGameStarts;