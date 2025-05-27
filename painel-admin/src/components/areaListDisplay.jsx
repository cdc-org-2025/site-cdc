// import React, { useState, useEffect, useMemo } from 'react'
// import axios from 'axios'

// const AreaListDisplay = (props) => {
//     const { record, property } = props
//     const [areaNames, setAreaNames] = useState([])

//     const selectedIds = useMemo(() => {
//         return Object.entries(record.params || {})
//             .filter(([key]) => key.startsWith(`${property.path}.`))
//             .sort((a, b) => {
//                 const indexA = parseInt(a[0].split('.')[1], 10)
//                 const indexB = parseInt(b[0].split('.')[1], 10)
//                 return indexA - indexB
//             })
//             .map(([, value]) => String(value))
//     }, [record.params, property.path])

//     useEffect(() => {
//         if (selectedIds.length === 0) return

//         let isMounted = true

//         axios.get('/admin/api/resources/areas/actions/list')
//             .then((response) => {
//                 if (!isMounted) return
//                 const areas = response.data.records.map(rec => rec.params)
//                 const names = areas
//                     .filter(area => selectedIds.includes(String(area.id)))
//                     .map(area => area.nome)
//                 setAreaNames(names)
//             })
//             .catch((err) => {
//                 console.error('Erro ao buscar áreas:', err)
//             })

//         return () => { isMounted = false } // evita atualizar estado após unmount
//     }, [selectedIds])

//     return (
//         <span>
//             {areaNames.length > 0 ? areaNames.join(', ') : 'Nenhuma área selecionada'}
//         </span>
//     )
// }

// export default AreaListDisplay

import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Box, Badge } from '@adminjs/design-system'

const AreaListDisplay = (props) => {
    const { record, property } = props
    const [areaNames, setAreaNames] = useState([])

    const selectedIds = useMemo(() => {
        return Object.entries(record.params || {})
            .filter(([key]) => key.startsWith(`${property.path}.`))
            .sort((a, b) => {
                const indexA = parseInt(a[0].split('.')[1], 10)
                const indexB = parseInt(b[0].split('.')[1], 10)
                return indexA - indexB
            })
            .map(([, value]) => String(value))
    }, [record.params, property.path])

    useEffect(() => {
        if (selectedIds.length === 0) return

        let isMounted = true

        axios.get('/admin/api/resources/areas/actions/search', {
            params: {
                query: '',
                perPage: 9999
            }
        })
            .then((response) => {
                if (!isMounted) return
                const areas = response.data.records.map(rec => rec.params)
                const names = areas
                    .filter(area => selectedIds.includes(String(area.id)))
                    .map(area => area.nome)
                setAreaNames(names)
            })
            .catch((err) => {
                console.error('Erro ao buscar áreas:', err)
            })

        return () => { isMounted = false }
    }, [selectedIds])


    return (
        <Box display="flex" flexWrap="wrap" gap="sm">
            {areaNames.length > 0
                ? areaNames.map((name, index) => (
                    <Badge key={index} variant="primary" style={{ marginRight: '2px' }}>
                        {name}
                    </Badge>
                ))
                : <Badge variant="light">Nenhuma área selecionada</Badge>}
        </Box>
    )
}

export default AreaListDisplay
