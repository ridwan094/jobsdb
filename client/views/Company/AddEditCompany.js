import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/solid'
import apiCompany from './ApiCompany'

export default function AddEditCompany(props) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef();

    const [values, setValues] = useState({
        comp_id: '',
        comp_name: '',
        comp_size: '',
        comp_industry: ''
    });

    // gunakan useEffect untuk edit region
    useEffect(() => {
        if (props.company.actionType === 'Edit') {
            //call apiRegion.findOne untuk mencari region dengan region_id yg dikirim dari props
            apiCompany.findOne(props.company.comp_id).then(data => {
                // jika ketemu, ubah values nya, pastikan tambahkan value={values.region_name}
                // di input type region_name agar bisa show value nya
                setValues({ ...values, comp_id: data.comp_id, comp_name: data.comp_name, comp_size: data.comp_size,
                comp_industry: data.comp_industry })
            })
        } else {
            setValues({ ...values, comp_id: undefined, comp_name: "" })
        }
    }, [props.company.actionType])



    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = () => {
          

        if (props.company.actionType === 'Add') {

            const company = {
                comp_id: values.comp_id || undefined,
                comp_name: values.comp_name || undefined,
                comp_size: values.comp_size || undefined,
                comp_industry: values.comp_industry || undefined
            }
            //call api u/ insert row
            apiCompany.create(company).then(result => {
                console.log(result);
            })

        } else if (props.company.actionType === 'Edit') {
            apiCompany.update(values).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true });

                }

            })
        }



        props.setModal();
        props.setStatus();
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
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

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <DocumentAddIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {props.title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            {/** code here... */}
                                            <form method="POST" action="#">
                                                <div className="flex flex-wrap">
                                                <label for="comp_id">ID Company </label>
                                                <input id="comp_id" name="comp_id"
                                                    value={values.comp_id}
                                                    type="text" placeholder="e.g 1" readOnly /><br/>
                                                </div>

                                                <div className="flex flex-wrap">
                                                <label for="comp_size">Company Size</label>
                                                <input id="comp_size" name="comp_size"
                                                    type="text" placeholder="e.g Size"
                                                    value={values.comp_size}
                                                    onChange={handleChange('comp_size')}
                                                /> <br/>
                                                </div>
                                                

                                                <input id="comp_name" name="comp_name"
                                                    type="text" placeholder="e.g Company"
                                                    value={values.comp_name}
                                                    onChange={handleChange('comp_name')}
                                                /> <br/>

                                                <input id="comp_industry" name="comp_industry"
                                                    type="text" placeholder="e.g Industry"
                                                    value={values.comp_industry}
                                                    onChange={handleChange('comp_industry')}
                                                />
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => props.setModal()}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}