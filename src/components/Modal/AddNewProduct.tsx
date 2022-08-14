import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
import React from "react";
import "react-markdown-editor-lite/lib/index.css";
import { useRecoilValue } from "recoil";
import logo from "../../../assets/images/logo.png";
import { userAccountState } from "../../../data/globalState";
import { apiAddProduct } from "../../api/manager";
import Button from "../common/Button";
import Image from "../common/Image";
import Input from "../common/Input";
import Modal from "../common/Modal";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface IAddNewAddressProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}
const AddNewProduct = (props: IAddNewAddressProps) => {
  const { isOpen, onClose, onClick } = props;
  const user = useRecoilValue(userAccountState);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");

  const textInputs = [
    {
      label: "Name",
      value: name,
      setValue: setName,
      type: "text",
    },
    {
      label: "Price",
      value: price,
      setValue: setPrice,
      type: "number",
    },
    {
      label: "Amount",
      value: amount,
      setValue: setAmount,
      type: "number",
    },
    {
      label: "Image",
      value: image,
      setValue: setImage,
      type: "text",
    },
  ];

  const handleSubmit = async () => {
    const res = await apiAddProduct(
      name,
      +price,
      +amount,
      details,
      image,
      category
    );

    if (res.status === 200) {
      onClick();
    }
    setName("");
    setPrice("");
    setAmount("");
    setDetails("");
    setImage("");
    setCategory("");
  };

  const mdParser = new MarkdownIt();
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div
          className="bg-white w-full flex flex-col justify-center items-center p-6 my-10 rounded-lg drop-shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2 className="text-2xl font-semibold mb-10 text-center">
            Add new address
          </h2>
          <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
            <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
              {textInputs.map((input, index) => (
                <Input
                  key={index}
                  label={input.label}
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                  type={input.type}
                />
              ))}

              <div>
                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  className="w-full border-2 rounded-md p-1"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="pool-cues">Pool cues</option>
                  <option value="pool-tables">Pool tables</option>
                  <option value="pool-accessories">Accessories</option>
                </select>
              </div>
            </div>
            <div className="relative w-full h-64 mt-10 border rounded-lg">
              <Image
                src={image || logo}
                alt="image preview"
                className="rounded-lg"
                height="100%"
                width="100%"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <MdEditor
            className="w-full h-64 mt-5"
            renderHTML={(text) => mdParser.render(text)}
            value={details}
            onChange={(text) => setDetails(text.text)}
          />
          <div className=" w-1/2 flex flex-row justify-between mt-10">
            <Button
              className="bg-gray-400"
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              onClick={async () => {
                await handleSubmit();
                onClick();
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewProduct;
