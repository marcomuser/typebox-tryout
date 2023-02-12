import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import fs from "fs/promises";

const SelectableCardSchema = Type.Object({
  component: Type.Literal("SelectableCard"),
  questionKeys: Type.Array(Type.String()),
  options: Type.Array(
    Type.Object({
      optionKey: Type.String(),
      text: Type.String(),
    })
  ),
  gridColumn: Type.String(),
  gridRow: Type.String(),
  title: Type.Object({
    text: Type.String(),
    tooltip: Type.Optional(Type.String()),
  }),
  subtitle: Type.Object({
    text: Type.String(),
    tooltip: Type.Optional(Type.String()),
  }),
  category: Type.Union([
    Type.Literal("Category 1"),
    Type.Literal("Category 2"),
  ]),

  noDetailsCheckbox: Type.Optional(Type.Boolean()),
  weight: Type.Optional(Type.Number({ minimum: 0, maximum: 1 })),
  multiple: Type.Optional(Type.Boolean()),
  popupOnSelect: Type.Optional(
    Type.Object({
      optionKey: Type.String(),
      text: Type.String(),
    })
  ),
});

type T = Static<typeof SelectableCardSchema>;
const validator = TypeCompiler.Compile(SelectableCardSchema);

const DummyReactComponent = (props: T) => {
  if (!validator.Check(props)) {
    throw new Error("passed configuration is not valid");
  }

  return props.title.text;
};

const json = JSON.stringify(SelectableCardSchema);
fs.writeFile("./schemaOutput.json", json);
