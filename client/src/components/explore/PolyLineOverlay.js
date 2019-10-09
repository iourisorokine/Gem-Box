import React, { Component } from "react";
import { CanvasOverlay } from "react-map-gl";

class PolyLineOverlay extends Component {
  _redraw = ({ width, height, ctx, isDragging, project, unproject }) => {
    const {
      points,
      color = "rgba(50,50,255,0.5)",
      lineWidth = 8,
      renderWhileDragging = true
    } = this.props;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    if ((renderWhileDragging || !isDragging) && points) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      points.forEach(point => {
        const pixel = project([point[1], point[0]]);
        console.log("pixel:", pixel)
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  };

  render() {
    return <CanvasOverlay redraw={this._redraw} />;
  }
}

export default PolyLineOverlay
