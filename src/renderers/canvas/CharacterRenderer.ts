import Character from "../../models/Character";
import { ColorObject } from "../../typings/types";
import StrokeRenderer from "./StrokeRenderer";

export default class CharacterRenderer {
  _strokeRenderers: StrokeRenderer[];

  constructor(character: Character) {
    this._strokeRenderers = character.strokes.map(
      (stroke: any) => new StrokeRenderer(stroke),
    );
  }

  render(
    ctx: CanvasRenderingContext2D,
    props: {
      opacity: number;
      strokes: any;
      strokeColor: ColorObject;
      radicalColor?: ColorObject | null;
    },
  ) {
    if (props.opacity < 0.05) return;
    for (let i = 0; i < this._strokeRenderers.length; i++) {
      this._strokeRenderers[i].render(ctx, {
        strokeColor: props.strokeColor,
        radicalColor: props.radicalColor,
        opacity: props.strokes[i].opacity * props.opacity,
        displayPortion: props.strokes[i].displayPortion,
      });
    }
  }
}
