import { ButtonTest } from "./ButtonTest";
import { IconTest } from "./IconTest";

function App() {
  return (
    <>
      <div
        style={{
          width: "100vw",
          textAlign: "center",
          padding: "10rem 0",
          color: "var(--tse-constellation-color-primary-light)",
          background: "var(--tse-constellation-color-primary-dark)",
        }}
      >
        <img src="/bulb.png" alt="TSE Logo" width={64} height={64} />
        <h1>TSE Constellation</h1>
        <p>A unified design system for Triton Software Engineering.</p>
      </div>

      {/* Component Previews */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        }}
      >
        <IconTest />
        <ButtonTest />
      </div>
    </>
  );
}

export default App;
