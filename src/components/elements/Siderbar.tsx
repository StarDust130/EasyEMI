import Image from "next/image";

const Siderbar = () => {
  return (
    <div className="w-40 border-r h-screen flex flex-col items-center">
      <div className="flex justify-center items-center gap-1 mt-5">
        <Image src="/logo.png" alt="logo" width={30} height={20} />
        <h1>Easy EMI</h1>
      </div>
    </div>
  );
};
export default Siderbar;
