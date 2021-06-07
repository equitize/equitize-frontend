/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import CategoriesDropdown from './CategoriesDropdown'
import SortedDropdown from './SortedDropdown'

export default function Example() {
  return (
    <Menu as="div" className="relative inline-block mr-2 mt-1 text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Filter
              <svg className="mr-1 ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                
                <div className="flex flex-row justify-between">
                  <p className="block px-4 py-2 text-sm">Categories</p>
                  <Menu.Item>
                      <CategoriesDropdown />
                  </Menu.Item>
                </div>

                <div className="flex flex-row justify-between">
                  <p className="block px-4 py-2 text-sm">Sorted by</p>
                  <Menu.Item>
                      <SortedDropdown />
                  </Menu.Item>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}