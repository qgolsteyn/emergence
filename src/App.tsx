import * as React from "react";
import styled from "styled-components";

import { Canvas } from "./components/Canvas";
import { Rule } from "./components/Rule";
import { generateMatrix } from "./generate/CellularAutomata";

const size = 511;

const StyledOptions = styled.div`
  position: absolute;
  width: 100%;
  padding: 16px;
  bottom: 0;
  border-top: 1px solid black;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background: white;
`;

class App extends React.Component<{ code: number }> {
  public state = {
    0: ((this.props.code >> 0) & 1) === 1,
    1: ((this.props.code >> 1) & 1) === 1,
    2: ((this.props.code >> 2) & 1) === 1,
    3: ((this.props.code >> 3) & 1) === 1,
    4: ((this.props.code >> 4) & 1) === 1,
    5: ((this.props.code >> 5) & 1) === 1,
    6: ((this.props.code >> 6) & 1) === 1,
    7: ((this.props.code >> 7) & 1) === 1
  };

  private graphics: PIXI.Graphics;

  public constructor(props: { code: number }) {
    super(props);

    this.graphics = new PIXI.Graphics();
    this.drawMatrix();
  }

  public render() {
    return (
      <>
        <Canvas n={size} graphics={this.graphics} />
        <StyledOptions>
          <Rule
            r={true}
            q={true}
            l={true}
            o={this.state[7]}
            onClick={this.onClick(7)}
          />
          <Rule
            r={true}
            q={true}
            l={false}
            o={this.state[6]}
            onClick={this.onClick(6)}
          />
          <Rule
            r={true}
            q={false}
            l={true}
            o={this.state[5]}
            onClick={this.onClick(5)}
          />
          <Rule
            r={true}
            q={false}
            l={false}
            o={this.state[4]}
            onClick={this.onClick(4)}
          />
          <Rule
            r={false}
            q={true}
            l={true}
            o={this.state[3]}
            onClick={this.onClick(3)}
          />
          <Rule
            r={false}
            q={true}
            l={false}
            o={this.state[2]}
            onClick={this.onClick(2)}
          />
          <Rule
            r={false}
            q={false}
            l={true}
            o={this.state[1]}
            onClick={this.onClick(1)}
          />
          <Rule
            q={false}
            r={false}
            l={false}
            o={this.state[0]}
            onClick={this.onClick(0)}
          />
        </StyledOptions>
      </>
    );
  }

  private onClick = (num: number) => async () => {
    await this.setState({ [num]: !this.state[num] });
    this.drawMatrix();
  };

  private drawMatrix = () => {
    const matrix = generateMatrix(this.generateCode(), size);
    this.graphics.clear();
    this.graphics.beginFill(0x000000);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j + size]) {
          this.graphics.drawRect(j, i, 1, 1);
        }
      }
    }
    this.graphics.endFill();
  };

  private generateCode = () => {
    return (
      (this.state[0] ? 1 : 0) +
      (this.state[1] ? 2 : 0) +
      (this.state[2] ? 4 : 0) +
      (this.state[3] ? 8 : 0) +
      (this.state[4] ? 16 : 0) +
      (this.state[5] ? 32 : 0) +
      (this.state[6] ? 64 : 0) +
      (this.state[7] ? 128 : 0)
    );
  };
}

export default App;
