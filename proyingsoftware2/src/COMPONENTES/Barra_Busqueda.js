import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, IconButton  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BarradeBusqueda = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/resultado`, { state: { query: searchTerm } });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '370px' }}>
      <TextField
        variant="outlined"
        placeholder="Busca productos por nombre..."
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleSearch}
              sx={{ 
                borderRadius: '50%', // Hacer el botón circular
                backgroundColor: '#567C8D', // Fondo del botón
                '&:hover': {
                  backgroundColor: '#4a6a7d', // Fondo del botón al pasar el mouse
                },
                width: '40px', // Ancho del botón
                height: '30px', // Alto del botón
                padding: '0', // Eliminar padding
                marginLeft: 1, // Espacio entre el campo de texto y el botón
                border: 'none', // Eliminar el borde predeterminado           
                
              }}
            >
              <SearchIcon sx={{ color: '#ffffff' }} />
            </IconButton>
          ),
        }}
        sx={{ 
            flexGrow: 1, 
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px', // Redondear las esquinas del campo de texto
            },
            '& .MuiInputBase-input': {
              height: '40px', // Ajustar la altura del campo de texto
              padding: '0 14px', // Ajustar el padding para un mejor ajuste
            },
          }}
        />
      </Box>
    );
  };
  
  export default BarradeBusqueda;
