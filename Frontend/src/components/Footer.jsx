import styled from "styled-components";

const Footer = () => {
    return ( 
        <Footers>
            <img src="../../logo.png" alt="logo" />
            <span>Made with ❤️ by <a href="https://github.com/alyconr"> Alyconr</a> </span>
        </Footers>

     );
}
 
export default Footer;

const Footers = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    background-color: #333;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-top: 50px;

    span {
        margin-right: 10px;
        margin-left: 10px;
        color: #fff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
    a {
        color: #fff;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }

    }
    img {
        width: 250px;
        height:250px;
        margin-right: 10px;
    }
`