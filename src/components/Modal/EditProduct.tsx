import MarkdownIt from "markdown-it";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import logo from "../../../assets/images/logo.png";
import { userAccountState } from "../../../data/globalState";
import { apiProductDetail } from "../../api/common";
import {
  apiAddProduct,
  apiDeleteProduct,
  apiUpdateProduct,
} from "../../api/manager";
import Button from "../common/Button";
import Image from "../common/Image";
import Input from "../common/Input";
import Modal from "../common/Modal";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface IAddNewAddressProps {
  editId: number;
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}
const EditProduct = (props: IAddNewAddressProps) => {
  const { isOpen, onClose, onClick, editId = 0 } = props;
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

  useEffect(() => {
    (async () => {
      const res = await apiProductDetail(editId);
      if (res) {
        setName(res.name);
        setPrice(res.price);
        setAmount(res.amount);
        setDetails(res.details);
        setImage(res.image);
        setCategory(res.category);
      }
    })();
  }, [editId]);

  const handleSubmit = async () => {
    const res = await apiUpdateProduct(
      editId,
      name,
      +price,
      +amount,
      details,
      image,
      category
    );

    if (res.status === 200) {
      toast.success("Product updated successfully");
      setName("");
      setPrice("");
      setAmount("");
      setDetails("");
      setImage("");
      setCategory("");
      onClick();
    }
  };

  const mdParser = new MarkdownIt(/* Markdown-it options */);
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
              className="bg-red-400"
              onClick={async () => {
                if (confirm("Are you sure you want to delete this product?")) {
                  const res = await apiDeleteProduct(editId);
                  if (res.status === 200) {
                    toast.success("Product deleted successfully");
                  }
                  onClick();
                }
              }}
            >
              Delete
            </Button>
            <Button
              onClick={async () => {
                await handleSubmit();
                onClick();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProduct;
