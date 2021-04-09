import styled from "@emotion/styled"

export const PageBody = styled("div")`
  width: 100%;
  height: 100%;
  padding: 2em;
`

export const TabHead = styled("div")`
  border-bottom: 1px solid white;
  display: flex;
  background: white;
`
export const TabContainer = styled("div")`
  margin-top: 30px;
`
export const TabBody = styled(PageBody)`
  height: 100%;
  padding: 0;
`
export const Tab = styled("div")`
  padding: 5px 40px 5px 40px;
  border: 1px solid black;
  border-radius: 10px 10px 0 0 ;
  background: ${({ selected }) => (selected ? "grey" : "white")};
  * {
    color: white;
  }
`
