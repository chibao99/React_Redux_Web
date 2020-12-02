import React from "react";
import { Segment, Container, Grid, Header, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Footer = () => {
  return (
    <Segment
      inverted
      vertical
      style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
    >
      <Container textAlign="center">
        <Grid columns={2} divided stackable inverted>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" inverted content="Địa chỉ các cửa hàng" />
              <p>
                8 đường số 14, Dương Quảng Hàm, Phường 5, Quận Gò Vấp, Tp Hồ Chí
                Minh
              </p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" inverted content="Tư vấn trực tuyến" />
              <Button.Group>
                <Button circular color="facebook" icon="facebook" />
                <Button circular color="twitter" icon="twitter" />
                <Button circular color="linkedin" icon="linkedin" />
                <Button circular color="google plus" icon="google plus" />
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
