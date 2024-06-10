import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material/Autocomplete';


export default function AutoComplete() {
    const names = ['Dylan' , 'dyl', 'ash'];

    return (
    <div>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Names" />}
    />
    </div>
    );
};
