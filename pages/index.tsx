import { ChangeEvent, FormEvent, useState, useRef, Fragment } from "react";
import { UiFileInputButton } from "../components/UiFileInputButton";
import { uploadFileRequest } from "../utils/upload";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import type { NextPage } from "next";
const Home: NextPage = () => {
  const cancelButtonRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    role: "",
    mail: "",
    professionalNumber: "",
    number: "",
    link: "",
    file: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const onChange = async (formData: FormData) => {
    if (!form.file) {
      const response = await uploadFileRequest(formData, (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      });
      console.log("response", response);
    } else {
      console.log("file already uploaded");
    }
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      form.firstName &&
      form.lastName &&
      form.role &&
      form.mail &&
      form.professionalNumber &&
      form.number &&
      form.link
    ) {
      fetch("/api/preview", {
        method: "POST",
        body: JSON.stringify(form),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setShowModal(true);
        });
      setIsSubmitted(true);
      console.log(form);
    } else {
      console.log("error");
      setIsSubmitted(false);
    }
  };
  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={isSubmitted}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Submitted
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Your form has been submitted successfully.
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setIsSubmitted(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div className="space-y-6 max-w-4xl m-auto py-4 container">
        <form onSubmit={onSubmit}>
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Signature
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Can you generate outlook signatures for your team
                </p>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, firstName: event.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, lastName: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      autoComplete="given-role"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, role: event.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="mail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mail
                    </label>
                    <input
                      type="text"
                      name="mail"
                      id="mail"
                      autoComplete="family-mail"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, mail: event.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="pro-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Professional Number
                    </label>
                    <input
                      type="text"
                      name="pro-number"
                      id="pro-number"
                      autoComplete="given-pro-number"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({
                          ...form,
                          professionalNumber: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      id="number"
                      autoComplete="family-number"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, number: event.target.value })
                      }
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="link"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      id="link"
                      autoComplete="family-link"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setForm({ ...form, link: event.target.value })
                      }
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-5">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload
                    </label>
                    <UiFileInputButton
                      label="Upload Single File"
                      uploadFileName="theFiles"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end py-3">
            {isSubmitted && (
              <div className="grid text-center ml-2.5">
                <a
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Preview
                </a>
              </div>
            )}
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setShowModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100">
                    <InformationCircleIcon
                      className="h-6 w-6 text-orange-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Preview
                    </Dialog.Title>
                    <div className="mt-2">
                      <iframe
                        src={`/api/preview`}
                        className="w-80 h-48 m-auto rounded-md"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Home;
