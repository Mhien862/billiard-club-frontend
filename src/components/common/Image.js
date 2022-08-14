import NextImage from "next/image";

// opt-out of image optimization, no-op
const customLoader = ({ src }) => {
  return src;
};

const Image = (props) => {
  const { src } = props;
  if (typeof src === "string") {
    return (
      <NextImage
        src={`/api/imageProxy?imageUrl=${props.src}`}
        {...props}
        loader={customLoader}
      />
    );
  }
  return <NextImage {...props} loader={customLoader} />;
};

export default Image;
