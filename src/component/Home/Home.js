import React,{useEffect} from "react";
import {
  Grid,
  Header,
  Segment,
  Container,
  Image,
  Card,
} from "semantic-ui-react";

const Home = () => {
  useEffect(() => {
    document.title = "Trang Chủ"
  }, []) 
  return (
    <div>
      <Segment>
        <Container textAlign="center">
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2" content="Lịch sử hình thành của chúng tôi" />
                <p>
                  Vivamus tempor ultrices quam vitae commodo. Morbi cursus felis
                  ac ante efficitur placerat. Pellentesque ut dictum purus. Ut
                  condimentum cursus dui, ut porttitor sapien elementum eget.
                  Nunc vel tellus magna. Cras sodales mauris non tellus
                  pharetra, vel laoreet tellus porta. Donec lacinia nisi sit
                  amet augue porta dictum. Nullam eget maximus risus, at posuere
                  quam. Duis et ligula euismod, fringilla ipsum vitae, maximus
                  nibh. Etiam eu eros sit amet est efficitur scelerisque eget
                  nec lectus. Sed eget nulla vitae turpis accumsan tristique.
                  Pellentesque egestas posuere mi, non imperdiet justo elementum
                  et. Vestibulum fermentum porttitor nunc, id rhoncus ex viverra
                  ac. Aenean lobortis odio quis turpis posuere commodo.
                </p>
              </Grid.Column>
              <Grid.Column>
                <Image
                  src="https://via.placeholder.com/150"
                  centered
                  size="medium"
                  circular
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Grid columns={2} style={{ marginTop: "20px" }} stackable>
            <Grid.Row>
              <Grid.Column>
                <Image
                  src="https://via.placeholder.com/150"
                  size="medium"
                  centered
                  circular
                />
              </Grid.Column>
              <Grid.Column>
                <Header as="h2" content="Mục tiêu trong  tương lai" />
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary, making this the first true generator on the
                  Internet. It uses a dictionary of over 200 Latin words,
                  combined with a handful of model sentence structures, to
                  generate Lorem Ipsum which looks reasonable. The generated
                  Lorem Ipsum is therefore always free from repetition, injected
                  humour, or non-characteristic words etc.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      <Segment>
        <Container textAlign="center">
          <Header as="h1" content="Các nhà sáng lập ra thương hiệu" />
          <Card.Group itemsPerRow={4}>
            <Card color="purple" image="https://via.placeholder.com/100" />
            <Card color="purple" image="https://via.placeholder.com/100" />
            <Card color="purple" image="https://via.placeholder.com/100" />
            <Card color="purple" image="https://via.placeholder.com/100" />
          </Card.Group>
        </Container>
      </Segment>
    </div>
  );
};

export default Home;
