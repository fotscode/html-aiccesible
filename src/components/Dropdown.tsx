import React from 'react';
import Select from 'react-select';

type DropdownProps = {
  models: { value: string; label: string }[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ models, selectedModel, setSelectedModel }) => {
  
  const selectedOption = models.find(model => model.value === selectedModel);

  const handleChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setSelectedModel(selectedOption.value);
    }
  };

  return (
    <div className='w-full md:w-[300px] mx-auto'>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={models}
        placeholder="Seleccione una opción"
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: '#D14805',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            boxShadow: 'none',
            minHeight: '40px',
          }),
          singleValue: (provided) => ({
            ...provided,
            color: 'white',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#D14805' : 'white',
            color: state.isFocused ? 'white' : 'black',
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
