type Item = {
  name: string
  proposals: number
  holders: number
  voters: number
}

export default function Dashboard({ items }: { items: Item[] }) {
  return (
    <>
      {items.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full border-2 border-[#D0CAB9]'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#EFF2E7] dark:text-gray-400 border-b border-[#D0CAB9]'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  Proposals
                </th>
                <th scope='col' className='px-6 py-3'>
                  Holders
                </th>
                <th scope='col' className='px-6 py-3'>
                  Voters
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr className='bg-white border-b dark:bg-[#F6F2E7] dark:border-[#D0CAB9] hover:bg-gray-50 dark:hover:bg-gray-600'>
                    <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black'>
                      Apple MacBook Pro 17"
                    </th>
                    <td className='px-6 py-4'>Silver</td>
                    <td className='px-6 py-4'>Laptop</td>
                    <td className='px-6 py-4'>$2999</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <span className='font-bold text-2xl h-64 w-full flex items-center justify-center'>There is no Proposals yet</span>
      )}
    </>
  )
}
