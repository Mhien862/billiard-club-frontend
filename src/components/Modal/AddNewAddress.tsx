import React from "react";
import { useRecoilValue } from "recoil";
import { userAccountState } from "../../../data/globalState";
import { apiRegisterInfo } from "../../api/customer";
import Button from "../common/Button";
import Input from "../common/Input";
import Modal from "../common/Modal";

interface IAddNewAddressProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}
const AddNewAddress = (props: IAddNewAddressProps) => {
  const { isOpen, onClose, onClick } = props;
  const user = useRecoilValue(userAccountState);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [dayOfBirth, setDayOfBirth] = React.useState("");

  const textInputs = [
    {
      label: "Name",
      value: name,
      setValue: setName,
      type: "text",
    },
    {
      label: "Phone",
      value: phone,
      setValue: setPhone,
      type: "tel",
    },
    {
      label: "Email",
      value: email,
      setValue: setEmail,
      type: "text",
    },
    {
      label: "Address",
      value: address,
      setValue: setAddress,
      type: "text",
    },
    {
      label: "Day of birth",
      value: dayOfBirth,
      setValue: setDayOfBirth,
      type: "date",
    },
  ];

  const handleSubmit = async () => {
    const res = await apiRegisterInfo(
      user.userAccount.id,
      name,
      email,
      phone,
      address,
      dayOfBirth
    );

    if (res.status === 200) {
      onClick();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center">
        <div
          className="bg-white w-full flex flex-col justify-center items-center lg:w-1/2 p-6 my-10 rounded-lg drop-shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2 className="text-2xl font-semibold mb-10 text-center">
            Add new address
          </h2>
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
          </div>
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

export default AddNewAddress;
