import styled from 'styled-components';

export const Description = styled.p`
  padding-right: 2em;
`;

export const Icon = styled.img`
  height: 50px;
  width: 50px;
`;

export const IconContainer = styled.div`
  flex-basis: 100px;
  flex-shrink: 0;
  text-align: center;
`;

export const ListItem = styled.li`
width: 500px;
max-width: 100%;
display: block;
margin: 5px auto;
padding: 15px 0;
display: flex;
border-bottom: 1px solid #dedede;
box-sizing: border-box;
flex: 0 0 30%;
@media screen and ( max-width: 1100px ) {
  flex: 0 0 50%;
}
h2 {
  margin: 0;
}
`;
