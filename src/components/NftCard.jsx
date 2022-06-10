import styled from 'styled-components';
import * as s from '../styles/globalStyles';
import { AiOutlineLink } from 'react-icons/ai';
import { HiExternalLink } from 'react-icons/hi';


const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px 24px 12px 0;
  height: 320px;
  width: 250px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;

`;

const CardImage = styled.div`
  background-image: url(${({ background }) => background});
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 250px;
  height: 250px;
  background-size: cover;
  transition: width 0.3s;
  transition: height 0.3s;

  &:hover {
    width: 258px;
    height: 258px;
  }
`;

const StyledLink = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
`;

const NFTCard = ({ name, collection, permalink, image_preview_url, token_id}) => {
    return (
        <CardWrapper id={`${collection.slug}_${token_id}`}>
        <CardImage background={image_preview_url} />
        <s.TextDescription>
            {name}
        </s.TextDescription>
        <hr style={{ marginTop: 8 }} />
        <StyledLink>
        <a target="_blank" href={permalink}>
          <HiExternalLink style={{ color: 'blue' }} />
        </a>
        <a target="_blank" href={permalink}>
          <AiOutlineLink style={{ color: 'blue' }} />
        </a>
        </StyledLink>
        </CardWrapper>
    )
}

export default NFTCard;
