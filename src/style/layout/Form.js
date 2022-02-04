import styled from 'styled-components';

export default styled.form`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: auto;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
  & > div.horiz {
    flex-direction: row;
    width: 100%;
  }
  & input[type='text'] {
    border: 1px solid lightgrey;
    padding: 4px;
    border-radius: 4px;
    margin: 4px 0;
  }
  & input[type='checkbox'] {
    margin-left: 10px;
  }
  & input[type='submit'] {
    padding: 4px;
    width: 156px;
  }
`;
