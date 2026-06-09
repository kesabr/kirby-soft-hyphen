import "./index.css";

panel.plugin("kesabr/kirby-soft-hyphen", {
  icons: {
    softHyphen: '<g transform="translate(2,2)"><path d="M9,0v20h2V0h-2ZM18,4v12h-3V4h3ZM15,2c-1.1,0-2,.9-2,2v12c0,1.1.9,2,2,2h3c1.1,0,2-.9,2-2V4c0-1.1-.9-2-2-2h-3ZM5,4v12h-3V4h3ZM2,2c-1.1,0-2,.9-2,2v12c0,1.1.9,2,2,2h3c1.1,0,2-.9,2-2V4c0-1.1-.9-2-2-2h-3Z"/></g>'
  },
  writerMarks: {
    softHyphen: {
      get button() {
        const lang = window.panel?.translation?.code;
        return {
          icon: "softHyphen",
          label: lang === "de" ? "Weicher Bindestrich" : "Soft Hyphen"
        };
      },
      schema: {
        inclusive: false,
        parseDOM: [{ tag: "span.k-shy" }],
        toDOM: () => ["span", { class: "k-shy" }, 0]
      },
      commands({ type }) {
        return () => (state, dispatch) => {
          if (dispatch) {
            const pos = state.selection.from;
            const tr = state.tr.insertText("­");
            dispatch(tr.addMark(pos, pos + 1, type.create()));
          }
          return true;
        };
      }
    }
  }
});
