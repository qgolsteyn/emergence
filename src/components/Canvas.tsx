/**
 * @fileoverview Defines a React component providing a WebGL environment
 * to display visualizer elements.
 */

import * as PIXI from "pixi.js";

import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";
import * as Viewport from "pixi-viewport";
import * as React from "react";

export class Canvas extends React.Component<{
  n: number;
  graphics: PIXI.Container;
}> {
  public state = {
    height: 0,
    width: 0
  };

  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private app: PIXI.Application;
  private viewport: Viewport;

  constructor(props: { n: number; graphics: PIXI.Container }) {
    super(props);

    // A React ref allows us to access the HTML node once it is created.
    this.canvasRef = React.createRef();
  }

  public componentDidMount() {
    const canvas = this.canvasRef.current!;

    // Create a PIXI.js app. PIXI.js acts as an abstraction layer
    // above the WebGL context.
    this.app = new PIXI.Application({
      antialias: true,
      autoStart: true,
      backgroundColor: 0xffffff,
      height: window.innerHeight,
      view: canvas,
      width: window.innerWidth
    });

    // Create the 2D camera
    this.viewport = new Viewport({
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      worldHeight: this.props.n,
      worldWidth: this.props.n,

      interaction: (this.app.renderer as any).interaction
    });

    this.viewport
      .drag()
      .pinch()
      .wheel()
      .clamp({ direction: "all" })
      .clampZoom({
        maxHeight: this.props.n,
        maxWidth: this.props.n,
        minWidth: 64
      });

    this.viewport.moveCenter(new PIXI.Point(this.props.n / 2));

    this.app.stage.addChild(this.viewport);

    this.viewport.addChild(this.props.graphics);
  }

  public render() {
    // We use a resize sensor to resize the canvas when the parent pane or window is
    // resized.
    return (
      <ResizeSensor observeParents={true} onResize={this.onResize}>
        <canvas
          ref={this.canvasRef}
          width={this.state.width}
          height={this.state.height}
        />
      </ResizeSensor>
    );
  }

  /**
   * @description Function that handles the canvas resize.
   */
  public onResize = (entries: IResizeEntry[]) => {
    if (entries[1] !== undefined) {
      const { width, height } = entries[1].contentRect;
      this.setState({ width, height });
      this.app.renderer.resize(width, height);
      this.viewport.resize(width, height, this.props.n, this.props.n);
    }
  };
}
