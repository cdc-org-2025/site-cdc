// import React, { useEffect, useState } from 'react'
// import { Box, Label, Select } from '@adminjs/design-system'
// import axios from 'axios'

// const MultiSelectInput = (props) => {
//   const { onChange, property, record } = props

//   // Get selected values from record params or default to empty array
//   const selectedValues = record.params[property.path] || []

//   const [options, setOptions] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   // Fetch areas to populate options
//   useEffect(() => {
//     setIsLoading(true)
//     axios.get('/admin/api/resources/areas/actions/list')
//       .then(response => {
//         const areaOptions = response.data.records.map(area => ({
//           value: area.params.id,
//           label: area.params.nome,
//         }))
//         setOptions(areaOptions)
//       })
//       .catch(error => {
//         console.error('Error fetching areas:', error)
//       })
//       .finally(() => {
//         setIsLoading(false)
//       })
//   }, [])

//   const handleChange = (selectedArray) => {
//     // Handle case where selectedArray is null (when clearing all selections)
//     const values = selectedArray ? selectedArray.map(option => option.value) : []
//     onChange(property.path, values)
//   }

//   // Reconstruct selected values in Select format
//   const selectedOptions = options.filter(option => 
//     Array.isArray(selectedValues) 
//       ? selectedValues.includes(option.value)
//       : selectedValues === option.value
//   )

//   return (
//     <Box marginBottom="xl">
//       {property.label && <Label>{property.label}</Label>}

//       <Select
//         isMulti
//         options={options}
//         value={selectedOptions}
//         onChange={handleChange}
//         isLoading={isLoading}
//         isDisabled={isLoading}
//       />
//     </Box>
//   )
// }

// export default MultiSelectInput

import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

const AreaMultiSelect = (props) => {
    const { record, onChange, property } = props
    const [options, setOptions] = useState([])

    // Converte todos os valores salvos para string
    //   const selected = (record.params[property.path] || []).map(String)
    // Garante que valores como areaDeAtuacao.0, areaDeAtuacao.1 etc. sejam tratados como array
    const selected = Object.entries(record.params)
        .filter(([key]) => key.startsWith(`${property.path}.`))
        .sort((a, b) => {
            const indexA = parseInt(a[0].split('.')[1], 10)
            const indexB = parseInt(b[0].split('.')[1], 10)
            return indexA - indexB
        })
        .map(([, value]) => String(value))


    // useEffect(() => {
    //     axios.get('/admin/api/resources/areas/actions/list').then((res) => {
    //         const values = res.data.records.map((area) => ({
    //             value: String(area.params.id),
    //             label: area.params.nome,
    //         }))
    //         setOptions(values)
    //     })
    // }, [])

    useEffect(() => {
        axios.get('/admin/api/resources/areas/actions/search', {
            params: {
                query: '',
                perPage: 9999,
            },
        }).then((res) => {
            const values = res.data.records.map((area) => ({
                value: String(area.params.id),
                label: area.params.nome,
            }))
            setOptions(values)
        })
    }, [])


    const handleChange = (selectedOptions) => {
        const values = selectedOptions.map((opt) => opt.value)
        console.log('handleChange values:', values)
        onChange(property.path, values)
    }

    const getSelectedOptions = () => {
        const filtered = options.filter((opt) => selected.includes(opt.value))
        console.log('getSelectedOptions:', filtered)
        return filtered
    }

    console.log('record.params:', record.params)

    return (
        <>
            <label style={{ fontSize: "12px", lineHeight: "16px", fontFamily: "Roboto, sans-serif" }}>Área</label>

            <div style={{ marginBottom: "25px", marginTop: "8px" }}>
                <Select
                    options={options}
                    value={getSelectedOptions()}
                    onChange={handleChange}
                    isMulti
                    placeholder="Selecione uma ou mais áreas"
                />
            </div>
        </>
    )
}

export default AreaMultiSelect

