import React, { useState, useEffect } from "react";
import apiCompany from "./ApiCompany";
import PageHeader from "../../components/PageHeader";
import AddEditCompany from "./AddEditCompany";

import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

export default function Company() {
  const [companies, setCompanies] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);
  // digunakan untuk edit region, kita butuh region_id
  const [company, setCompany] = useState({
    comp_id: undefined,
    actionType: undefined,
  });

  useEffect(() => {
    // call api
    apiCompany
      .list()
      .then((data) => {
        //jika response sukses, then fill data to regions variable using setRegions
        setCompanies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); //jika useEffect parameter kedua di isi empty array[], useEffect akan di run 1 kali.

  useEffect(() => {
    apiCompany
      .list()
      .then((data) => {
        setCompanies(data);
        setStatus(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]); // jika status berubah maka useEffect di trigger kembali

  const onDelete = async (id) => {
    apiCompany.remove(id).then((result) => {
      console.log(result);
      setStatus(true);
    });
  };

  const onCreate = async () => {
    setCompany({
      comp_id: undefined,
      actionType: "Add",
    });
    setModal(true);
  };

  const onEdit = async (id) => {
    setCompany({
      comp_id: id,
      actionType: "Edit",
    });
    setModal(true);
  };

  return (
    <div>
      <PageHeader title={"Companies"} setModal={() => onCreate()} />

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>

                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company ID
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company Size
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company Name
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Industry
                    </th>

                    <th className="px-6 py-3 col-span-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companies.map((data) => (
                    <tr key={data.comp_id}>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.comp_id}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.comp_name}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.comp_size}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {data.comp_industry}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                          <span className="hidden sm:block mr-2">
                            <button
                              onClick={() => {
                                onEdit(data.comp_id);
                              }}
                              type="button"
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <PencilAltIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                              />
                            </button>
                          </span>
                          <span className="hidden sm:block">
                            <button
                              onClick={() => {
                                  if(window.confirm('Delete this record?'))
                                  onDelete(data.comp_id)
                              }}
                              type="button"
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                            >
                              <TrashIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                                aria-hidden="true"
                              />
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modal ? (
        <AddEditCompany
          title={"Add Company"}
          setModal={() => setModal(false)}
          setStatus={() => setStatus(true)}
          company={company}
        />
      ) : null}
    </div>
  );
}
