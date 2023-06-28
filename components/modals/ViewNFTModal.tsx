import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // import XIcon
import SVGDisplay from "../SVGDisplay";

interface ViewNFTModalProps {
  svg: string | null;
  show: boolean;
  handleClose: () => void;
}

export default function ViewNFTModal({
  svg,
  show,
  handleClose,
}: ViewNFTModalProps) {
  const cancelButtonRef = useRef(null);

  if (!svg) {
    console.log("no svg");
    return null;
  }

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg bg-transparent">
                <div className="bg-transparent">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-0 right-0"
                  >
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="p-12">
                  <SVGDisplay svg={svg} width={"400px"} height={"400px"} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  // return (
  //   <Transition.Root show={show} as={Fragment}>
  //     <Dialog
  //       as="div"
  //       className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
  //       initialFocus={cancelButtonRef}
  //       onClose={handleClose}
  //     >
  //       <Dialog.Overlay className="fixed inset-0 bg-black opacity-90" />
  //       <Transition.Child
  //         as={Fragment}
  //         enter="transition transform duration-200"
  //         enterFrom="scale-75 opacity-0"
  //         enterTo="scale-100 opacity-100"
  //         leave="transition transform duration-200"
  //         leaveFrom="scale-100 opacity-100"
  //         leaveTo="scale-75 opacity-0"
  //       >
  //         <div className="flex flex-col items-center bg-transparent overflow-auto">
  // <div>
  //   <button
  //     type="button"
  //     onClick={handleClose}
  //     className="absolute top-0 right-0"
  //   >
  //     <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
  //   </button>
  // </div>
  // <div className="p-12">
  //   <SVGDisplay svg={svg} width={"400px"} height={"400px"} />
  // </div>
  //         </div>
  //       </Transition.Child>
  //     </Dialog>
  //   </Transition.Root>
  // );
}
