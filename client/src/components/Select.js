const SelectBox = ({set,termValue, value}) => {
    const handleChange = (e) => {
		// event handler
		
		value(e.target.value)
	};
	return (
		<select 
        className='chart_select'
        onChange={handleChange}
		value={termValue}
		>
			{typeof set==='object'?set.map((option) => (
				<option
					key={option.value}
					value={option.value}
					defaultValue={set.defaultValue === option.value}
				>
					{option.name}
				</option>
			)):<></>}
		</select>
	);
};


export default SelectBox;