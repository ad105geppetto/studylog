interface Subtitle {
  text: string;
}

const Subtitle = ({ text }: Subtitle) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default Subtitle;
