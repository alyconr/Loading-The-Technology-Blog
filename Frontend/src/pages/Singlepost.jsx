import styled from "styled-components";
import { BsFillTrashFill } from "@react-icons/all-files/bs/BsFillTrashFill";
import { FcEditImage } from "@react-icons/all-files/fc/FcEditImage";
import { Link } from "react-router-dom";
import MenuLeft from "../components/Menuside";

const Singlepost = () => {
  return (
    <Wrapper>
      <Post>
        <img
          className="postImg"
          src="https://images.pexels.com/photos/1261427/pexels-photo-1261427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img
            className="userImg"
            src="https://images.pexels.com/photos/8159657/pexels-photo-8159657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="info">
            <span>John Doe</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="Actions">
            <Link to={`/write?edit=2`}>
              <FcEditImage size={25} />
            </Link>

            <BsFillTrashFill color={"#6A072D"} size={25} />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        <p>
          Adipiscing conubia consectetur lacus consequat non, adipiscing urna
          magnis id scelerisque dictum hac! Quisque lacus neque iaculis dictumst
          enim pharetra porttitor nam. Ultrices dis molestie nulla potenti fusce
          consequat penatibus ultricies egestas odio. Tincidunt enim eu augue ac
          ad convallis vestibulum, habitant mauris urna fermentum proin!
          Maecenas vehicula nisl euismod consequat hendrerit. Pretium adipiscing
          mollis malesuada hendrerit pulvinar luctus parturient at suscipit
          faucibus molestie eu! Curabitur blandit erat conubia convallis augue
          cras vehicula quam varius rhoncus. Consectetur ad ultricies odio et
          potenti vivamus primis tempor. Rhoncus erat etiam dictumst curae;
          porta vitae eleifend.
        </p>
        <p>
          Ornare fringilla sociosqu sollicitudin. Duis mauris ridiculus eu donec
          montes. Proin non tincidunt dapibus sed? Justo vivamus, senectus
          viverra platea imperdiet orci nibh. Class, in lorem convallis nullam
          hac. Semper cras placerat nullam molestie vel per turpis. Nunc nibh
          convallis tristique ullamcorper elit congue eu. Sit congue penatibus
          feugiat donec quis in commodo semper aenean mi ut ultricies. Sed non
          etiam pellentesque augue mauris facilisi tincidunt facilisis amet.
          Eros cum fusce mi, donec lorem morbi pulvinar taciti inceptos orci!
          Pretium sapien, donec consectetur consectetur aenean neque? Mus
          pharetra pretium taciti ultrices diam morbi quam volutpat taciti, non
          vel per? Nibh dapibus fringilla dui posuere, justo cursus lacinia
          convallis pharetra blandit. Lobortis penatibus sed rhoncus libero
          hendrerit ornare et. Per orci faucibus nibh vivamus sociis tortor
          metus in cum.
        </p>
        <p>
          Tristique etiam eu velit cras lacinia suspendisse, facilisi nostra
          curabitur. Malesuada tempus lacus lobortis luctus, facilisis auctor
          purus. Ultrices est vel odio morbi elementum? Dictum faucibus purus
          augue semper odio laoreet. Eleifend ligula rhoncus facilisis ultricies
          porta accumsan nisi hendrerit fermentum justo convallis. Litora leo
          etiam parturient iaculis tincidunt lorem dictumst molestie laoreet.
          Maecenas metus at commodo proin netus. Sit ultricies auctor mi mus
          hendrerit. Litora nunc inceptos non lorem ullamcorper mi himenaeos
          eleifend condimentum conubia conubia. Inceptos fusce ultrices nam?
        </p>
        <p>
Consectetur nibh curae; cubilia tortor. Phasellus volutpat non facilisi. Dolor mattis ridiculus consectetur auctor. Curae; lobortis facilisi ad posuere mus eros? Libero elit libero etiam ultrices gravida ac porta tellus arcu a bibendum pretium. Mollis natoque tempus vel. Quisque risus fusce sodales magnis orci in lorem mus. Magna vitae fringilla etiam dictumst hac taciti pulvinar habitant dis eu tristique! Facilisis pretium penatibus dui! Massa posuere erat consequat sapien massa litora tempus litora. Penatibus habitasse sollicitudin, volutpat iaculis eu parturient pharetra. Magna morbi ridiculus posuere dictumst malesuada integer penatibus natoque etiam cras. Lacus facilisis sodales hac proin turpis orci. Ipsum dictumst dictumst vestibulum primis condimentum consectetur sagittis nec bibendum interdum. Commodo aliquam orci integer tempus torquent euismod praesent ultrices. Nec nam pretium taciti proin tempus non torquent ipsum nullam tellus! Fames arcu etiam senectus risus quis. Dictum iaculis ridiculus feugiat platea iaculis feugiat ullamcorper felis. Varius luctus blandit scelerisque lacus tortor vivamus hendrerit sagittis parturient sociosqu. Nibh tincidunt egestas adipiscing himenaeos dis habitant nostra mauris. A imperdiet commodo ornare senectus tempor hendrerit auctor facilisi, laoreet gravida adipiscing. Ullamcorper quis libero magnis. Primis class mauris ad elementum scelerisque fringilla! Faucibus dapibus nullam nullam sociosqu quisque commodo.
</p>
<p>
Vel scelerisque nisi nunc. Platea feugiat tempor pretium commodo mauris. Ac turpis sagittis lacinia nullam velit vulputate volutpat laoreet amet magnis integer. Euismod justo magna sociis conubia tortor ut inceptos orci ac a himenaeos! Pretium id vehicula orci volutpat eget platea nibh? Vehicula netus gravida faucibus venenatis mauris mi fermentum nascetur congue quam. Aliquet porttitor tellus arcu vel sociis posuere praesent accumsan ridiculus semper! Vivamus nascetur dictumst accumsan leo erat penatibus dictum ultrices, blandit adipiscing dolor. Dapibus lacus gravida aenean turpis fusce dis class tempor vel nisl tristique. Sagittis urna dictum congue vulputate morbi ad condimentum metus dapibus? Justo malesuada vehicula montes himenaeos dui ut tincidunt interdum. Blandit sapien dis, sociis maecenas dignissim magnis hac dictum leo. Posuere natoque nascetur rhoncus per mollis vulputate justo sagittis. Class ullamcorper dapibus ridiculus dictum vivamus. Nulla vestibulum, et interdum nisl ultrices condimentum a mattis sem dolor. Gravida maecenas molestie nunc venenatis. Suscipit inceptos in a morbi sed dis diam augue eget vivamus.
</p>
      </Post>
      <MenuSide>
        <MenuLeft />
      </MenuSide>
    </Wrapper>
  );
};

export default Singlepost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Post = styled.div`
  flex: 5;
  margin: 0 30px;

  .postImg {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    margin: 30px 0;
  }

  .user {
    display: flex;
    align-items: center;
    margin: -10px 0;

    .userImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    span {
      font-weight: bold;
    }

    p {
      font-size: 14px;
      color: #555;
    }
  }

  .Actions {
    padding: 10px;
    display: flex;
    gap: 10px;
  }

  h1 {
    margin: 20px 0;
    font-size: 30px;
  }

  p {
    line-height: 25px;
    font-size: 20px;
    color: #333;
    text-align: justify;
  }
`;

const MenuSide = styled.div`
  flex: 3;
`;
