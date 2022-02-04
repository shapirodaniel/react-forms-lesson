import styled from 'styled-components';

export default styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  & > div {
    margin: 4px;
  }
`;
