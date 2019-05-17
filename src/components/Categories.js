import styled from "@emotion/styled"

export const CategoryListItem = styled.li`
  list-style: none;
  position: relative;
  padding: 10px;
  color: navy;
  transition: color 200ms ease-in-out, text-shadow 200ms ease-in-out;
  a {
    color: navy;
    transition: color 200ms ease-in-out;
  }
  a:hover {
    color: #fff;
  }
  &:nth-of-type(even) {
    background: rgba(30,144,255,.25);
  }
  &:nth-of-type(odd) {
    background: rgba(145, 145, 145,.25);
  }
  &:nth-of-type(even):hover, &:nth-of-type(even).active {
    background: rgba(30,144,255, 1);
  }
  &:nth-of-type(odd):hover, &:nth-of-type(odd).active {
    background: rgba(145, 145, 145, 1);
  }
  &.active {
    color: #fff;
  }
  &:before {
    position: absolute;
    display: block;
    top: 50%;
    left: 0;
    transform: translateX(-50px) translateY(-50%);
    text-align: right;
    width:40px;
    color: navy;
    content: "${props=>props.index}"; 
  }
`

export const CategoryListButtons = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  margin: 30px -10px;
  @media screen and (max-width: 540px) {
    justify-content: center;
  }
  li {
    box-sizing: border-box;
    display: inline;
    margin: 10px;
    flex: 0 0 auto;
    border-radius: 20px;
    padding: 0;
    font-weight: 700;
    transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
    a {
      padding: 14px;
      display: block;
      width: 100%;
      text-decoration:none;
      @media screen and (max-width: 540px) {
        padding: 10px;
        font-size: 15px;
      }
    }
    a:hover {
      text-shadow: none;
      color: #fff;
    }
  }
  li:hover {
    color: #fff;
  }
  li:nth-of-type(even):hover {
    background: rgba(30,144,255,1);
  }
  li:nth-of-type(odd):hover {
    background: rgba(145, 145, 145, 1);
  }
`

export const CategoryAlpaLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px -10px;
  a {
    margin: 10px;
  }
`