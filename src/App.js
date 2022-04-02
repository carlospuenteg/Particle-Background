import Background from "./Background";

export default function App() {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#000";
    return (
    <div className="App">
        <Background />
    </div>
    );
}