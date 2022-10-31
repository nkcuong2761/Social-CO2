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
import Button from './Button';
import { motion, useSpring } from 'framer-motion';

// Styled Components for the Search Box
const SearchWrapper = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  gap: 10px;

  position: absolute;
  width: 372px;
  height: 24px;
  left: 30px;
  top: 24px;
  background: white;
  z-index: 4;
  /* sh */
  box-shadow: 0px 4px 10px rgba(51, 51, 51, 0.1);
  border-radius: 12px;

  @media only screen and (max-width: 768px) {
    width: 88vw;
    left: 50vw;
    transform: translateX(-50%);
  }
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
  width: ${({ width }) => `${width-40}px`};
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

const SearchBox = ({ x, width, isOpen, setOpen, locationName }) => {
  const CloseWrapper = styled.div`
    display: ${locationName ? 'flex' : 'none'};
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 12px;
  `

  function searchClicked() {
    alert('search button clicked')
  }
  function closeClicked() {
    alert('close button clicked')
  }

  return (
    <SearchWrapper>
      <IconFrame>
        <motion.div
          onTap={() => {
            console.log(isOpen)
            setOpen(!isOpen)
            isOpen ? x.set(-width) : x.set(0)
          }}>
          <Button variant='icon-only' type="submit" id="menu">
            <Menu />
          </Button>
        </motion.div>
        <Typography variant="subheading2">
          <input type="text" defaultValue={locationName} placeholder="Search" />
        </Typography>
      </IconFrame>
      <IconFrame>
        <Button variant='icon-only' type="submit" id="search" onClick={searchClicked}>
          <MagnifyingGlass fill={Colors.white} stroke={Colors.dark}/>
        </Button>
        <CloseWrapper locationName={locationName}>
          <SeperatorH stroke={Colors.white_2}/>
          <Button variant='icon-only' id="close" onClick={closeClicked}>
            <X stroke={Colors.dark}/>
          </Button>
        </CloseWrapper>
      </IconFrame>
    </SearchWrapper>
  )
}

export const NavBox = ({width = 444, locationName}) => {
  const [isOpen, setOpen] = useState(false)
  const x = useSpring(0, {stiffness: 400, damping: 40})

  return (
    <SidebarWrapper
    onPan={(e, pointInfo) => {
      if (pointInfo.point.x < width)
        x.set(pointInfo.point.x - width)
    }}
    onPanEnd={(e, pointInfo) => {
      if (Math.abs(pointInfo.velocity.x) > 1000 && !isOpen) {
        if (pointInfo.velocity.x > 0) {
          x.set(0)
        } else x.set(-width)
      } else {
        if (Math.abs(x.current) < width / 2) {
          x.set(0)
          setOpen(true)
        } else {
          x.set(-width)
          setOpen(false)
        }
      }
    }}
    >
      <SearchBox locationName={locationName} width={width} x={x} isOpen={isOpen} setOpen={setOpen}/>
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
          <img src={require('../assets/logo-xl.png')} width='154px'/>
          <motion.div
          onTap={() => {
            console.log(isOpen)
            setOpen(!isOpen)
            isOpen ? x.set(-width) : x.set(0)
          }}>
            <Button variant='icon-only' id="close">
              <X stroke={Colors.dark}/>
            </Button>
          </motion.div>
        </SidebarHeader>
        <MenuLayout>
          <MenuItem>
            <Bluetooth />
            <Typography variant='h4'>Get Bluetooth Info</Typography>
          </MenuItem>
          <MenuItem>
            <HelpCircle />
            <Typography variant='h4'>How to use SocialCO2</Typography>
          </MenuItem>
          <MenuItem>
            <Smile />
            <Typography variant='h4'>About us</Typography>
          </MenuItem>
        </MenuLayout>
      </SidebarContainer>
    </SidebarWrapper>
  )
}
