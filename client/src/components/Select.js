const SelectBox = (props) => {
    const handleChange = (e) => {
		// event handler
		console.log(e.target.value);
	};
	return (
		<select 
        className='st_select'
        onChange={handleChange}>
            <option disabled={false}>
                Select Your Security Token
            </option>
			{props.options.map((option) => (
				<option
					key={option.value}
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};


export default SelectBox;