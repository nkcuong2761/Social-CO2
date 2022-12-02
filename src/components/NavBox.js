import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from './typography';
import Colors from './colors';
import {ReactComponent as MagnifyingGlass} from '../assets/icons/MagnifyingGlass.svg';
import {ReactComponent as SeperatorH} from '../assets/icons/SeperatorH.svg';
import {ReactComponent as X} from '../assets/icons/X.svg';
import {ReactComponent as Menu} from '../assets/icons/Menu.svg';
import {ReactComponent as Bluetooth} from '../assets/icons/Bluetooth.svg';
import {ReactComponent as HelpCircle} from '../assets/icons/HelpCircle.svg';
import {ReactComponent as Smile} from '../assets/icons/Smile.svg';
import {ReactComponent as AlertTriangle} from '../assets/icons/AlertTriangle.svg';
import {ReactComponent as LogoXL} from '../assets/logo-xl.svg';
import Button from './Button';
import { motion, useSpring } from 'framer-motion';
import { Modal } from '@mui/material';
import imgKhanh from '../assets/img/khanh.jpeg';
import imgCuong from '../assets/img/cuong.jpg';
import imgTung from '../assets/img/tung.jpeg';
import imgMinhbui from '../assets/img/minhbui.jpg';

// Styled Components for the Search Box
const SearchWrapper = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  cursor: pointer;

  position: absolute;
  width: 56px;
  height: 56px;
  left: 30px;
  top: 24px;
  background: ${Colors.white};
  z-index: 4;
  /* sh */
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1);
  border-radius: 12px;

  /* @media only screen and (max-width: 768px) {
    width: 88vw;
    left: 50vw;
    transform: translateX(-50%);
  } */
`
const IconFrame = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 12px;
`

// Styled Components for the Side Bar
const SidebarWrapper = styled(motion.div)`
  position: fixed;
  height: 100vh;
  z-index: 7;
`
const SidebarContainer = styled(motion.div)`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 16px;
  z-index: 7;

  position: absolute;
  width: ${({ width }) => `${width}px`};
  height: 100%;
  left: 0px;
  top: 0px;

  background: ${Colors.white};
  /* sh */
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1);
`
const SidebarHeader = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  gap: 10px;

  /* Inside auto layout */
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`
const MenuLayout = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  /* Inside auto layout */
  flex: none;
  flex-grow: 0;
  align-self: stretch;
`
const MenuItem = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 14px 20px;
  gap: 8px;
  height: 52px;

  /* Inside auto layout */
  flex: none;
  align-self: stretch;
  flex-grow: 0;

  :hover {
    cursor: pointer;
    /* color: ${Colors.primary}; */
    background: ${Colors.white_3};
  }
`

const SearchBox = ({ x, width, isOpen, setOpen, locationName, newCoords, setPopupInfo }) => {
  const CloseWrapper = styled.div`
    display: ${(locationName || newCoords) ? 'flex' : 'none'};
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 12px;
  `
  // setPopupInfo(null);
  function searchClicked() {
    alert('search button clicked')
  }
  function closeClicked() {
    setPopupInfo(null);
  }

  return (
    <motion.div
          onTap={() => {
            setOpen(!isOpen)
            isOpen ? x.set(-width) : x.set(0)
          }}>
      <SearchWrapper>
        <IconFrame>
          <Button variant='icon-only' type="submit" id="menu">
            <Menu />
          </Button>
          {/* <Typography variant="subheading2">
            <input type="text" defaultValue={locationName} placeholder="Search" />
          </Typography> */}
        </IconFrame>
        {/* <IconFrame>
          <Button variant='icon-only' type="submit" id="search" onClick={searchClicked}>
            <MagnifyingGlass fill={Colors.white} stroke={Colors.dark}/>
          </Button>
          <CloseWrapper locationName={locationName}>
            <SeperatorH stroke={Colors.white_2}/>
            <Button variant='icon-only' id="close" onClick={closeClicked}>
              <X stroke={Colors.dark}/>
            </Button>
          </CloseWrapper>
        </IconFrame> */}
      </SearchWrapper>
    </motion.div>
  )
}
const ModalContainer = styled.div`
  outline: 0;
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;

  position: absolute;
  width: 768px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${Colors.white};

  /* sh */
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1);
  border-radius: 12px;

  @media only screen and (max-width: 768px) {
    width: 70%;
    height: 400px;
    overflow-y: scroll;
  }
`
const FrameInModal = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  /* Inside auto layout */
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`
const HeaderFrame = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  /* Inside auto layout */
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`
const HelpModal = ({isOpen, setOpen}) => {
  return (
    <Modal
      open={isOpen}
      onClose = {() => setOpen(false)}
    >
      <ModalContainer>
        <FrameInModal>
          <HeaderFrame>
            <HelpCircle/>
            <Typography variant='h1'>How to use SocialCO2</Typography>
          </HeaderFrame>
          <Typography variant='body'>
          1. The markers you see on the map represent different locations that have the CO2 data. The opaque-colored circles underneath the markers represent the critical CO2 level of the area during that time.<br/>
          - <span style={{color: Colors.critical}}>Red circle: High</span> CO2 level (above 1400 ppm)<br/>
          - <span style={{color: Colors.warningText}}>Yellow circle: Medium</span> CO2 level (1000 to 1400 ppm)<br/>
          - <span style={{color: Colors.okbro}}>Green circle: Low</span> CO2 level (below 1000 ppm)<br/>
          <br/>
          2. The CO2 level appears for each location represent the average CO2 level during the 1-hour time frame. For instance, if you are accessing this website at 2:45 pm, this number represents the average CO2 level of the selected location from 2 pm to 3 pm.
          </Typography>
        </FrameInModal>
        <FrameInModal>
          <HeaderFrame>
            <AlertTriangle/>
            <Typography variant='h2' color='warning'>Disclaimer</Typography>
          </HeaderFrame>
          <Typography variant='body'>
          As developers of this product, we are encouraging customers to use the Aranet4 sensors for public spaces. Looking at the CO2 data trend, there is a clear difference between vacant space and occupied space. This suggests a privacy concern as the data being published, might disclose whether the user is in their private space.
          </Typography>
        </FrameInModal>
      </ModalContainer> 
    </Modal>
  )
}
const ImageFrame = styled.div`
  /* Auto layout */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0px;
  gap: 32px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 24px;
  }
`
const ImageCard = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  /* Inside auto layout */
  flex: none;
  flex-grow: 0;
`
const Img = styled.img`
  width: 100%;
  height: 162px;
  object-fit: cover;
  src: ${({ src }) => `${src}`};
  border-radius: 8px;

  @media only screen and (max-width: 768px) {
    height: 200px;
  }
`

const AboutModal = ({isOpen, setOpen}) => {
  return (
    <Modal
      open={isOpen}
      onClose={() => setOpen(false)}
    >
      <ModalContainer>
        <FrameInModal>
          <HeaderFrame>
            <Smile/>
            <Typography variant='h1'>About us</Typography>
          </HeaderFrame>
          <Typography variant='body'>
          SocialCO2 started off as a senior design project, proposed by Professor Deborah Sills to the Computer Science department at Bucknell University. The team was made up of four above-average CS students under the supervision of Professor Evan Peck.
          </Typography>
        </FrameInModal>
        <ImageFrame>
          <ImageCard>
            <Img src={imgKhanh}/>
            <div>
              <Typography variant='h5'>Khanh Pham '23</Typography>
              <Typography variant='body' color='grey'>Product Owner</Typography>
            </div>
          </ImageCard>
          <ImageCard>
            <Img src={imgCuong}/>
            <div>
              <Typography variant='h5'>Cuong Nguyen '23</Typography>
              <Typography variant='body' color='grey'>Scrum Master</Typography>
            </div>
          </ImageCard>
          <ImageCard>
            <Img src={imgTung}/>
            <div>
              <Typography variant='h5'>Tung Tran '23</Typography>
              <Typography variant='body' color='grey'>Tech Lead</Typography>
            </div>
          </ImageCard>
          <ImageCard>
            <Img src={imgMinhbui}/>
            <div>
              <Typography variant='h5'>Minh Bui '22</Typography>
              <Typography variant='body' color='grey'>Developer</Typography>
            </div>
          </ImageCard>
        </ImageFrame>
      </ModalContainer>
    </Modal>
  )
}

export const NavBox = ({width = 400, locationName, newCoords, getBluetoothData, setPopupInfo}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isHelpModalOpen, setHelpModalOpen] = useState(false)
  const [isAboutModalOpen, setAboutModalOpen] = useState(false)

  const x = useSpring(0, {stiffness: 400, damping: 40})

  return (
    <>
    <HelpModal isOpen={isHelpModalOpen} setOpen={setHelpModalOpen}/>
    <AboutModal isOpen={isAboutModalOpen} setOpen={setAboutModalOpen}/>
    <SidebarWrapper
    onPan={(e, pointInfo) => {
      if (pointInfo.point.x < width)
        x.set(pointInfo.point.x - width)
    }}
    onPanEnd={(e, pointInfo) => {
      if (Math.abs(pointInfo.velocity.x) > 1000 && !isSidebarOpen) {
        if (pointInfo.velocity.x > 0) {
          x.set(0)
        } else x.set(-width)
      } else {
        if (Math.abs(x.current) < width / 2) {
          x.set(0)
          setSidebarOpen(true)
        } else {
          x.set(-width)
          setSidebarOpen(false)
        }
      }
    }}
    >
      <SearchBox
        locationName={locationName} 
        newCoords={newCoords}
        width={width} x={x}
        isOpen={isSidebarOpen} setOpen={setSidebarOpen}
        setPopupInfo={setPopupInfo} />
      <SidebarContainer
      width = {width}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 40
      }}
      initial={{ x: -width }}
      style={{ x }}
      >
        <SidebarHeader>
          <LogoXL/>
          <motion.div
          onTap={() => {
            console.log(isSidebarOpen)
            setSidebarOpen(!isSidebarOpen)
            isSidebarOpen ? x.set(-width) : x.set(0)
          }}>
            <Button variant='icon-only' id="close">
              <X stroke={Colors.dark}/>
            </Button>
          </motion.div>
        </SidebarHeader>
        <MenuLayout>
          <MenuItem onClick={getBluetoothData}>
            <Bluetooth />
            <Typography variant='h4'>Get Bluetooth Info</Typography>
          </MenuItem>
          <MenuItem onClick={() => setHelpModalOpen(true)}>
            <HelpCircle />
            <Typography variant='h4'>How to use SocialCO2</Typography>
          </MenuItem>
          <MenuItem onClick={() => setAboutModalOpen(true)}>
            <Smile />
            <Typography variant='h4'>About us</Typography>
          </MenuItem>
        </MenuLayout>
      </SidebarContainer>
    </SidebarWrapper>
    </>
  )
}
