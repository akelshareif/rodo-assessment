import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Container component which will hold drop-down search form
// Component will handle state and control the inputs

const SearchGroup = ({ setTableData }) => {
    // Object maps the initial state to the appropriate text
    const INITIAL_STATE = {
        make: '',
        model: '',
        year: '',
        budget: '',
    };

    // Creating the form state with the above initial state object
    const [searchData, setSearchData] = useState(INITIAL_STATE);

    // Creating state to hold models to properly populate the form
    const [models, setModels] = useState([]);

    // Creating state to hold selected model's available years
    const [selectedModelYears, setSelectedModelYears] = useState([]);

    // useEffect hooks will retrieve and populate model and year options
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post('http://localhost:3000/cars', {
                    make: searchData.make,
                });

                setModels(data.colatedResults);
            } catch (err) {
                setModels([]);
                setTableData({});
            }
        };

        fetchData();
    }, [searchData.make, setTableData]);

    useEffect(() => {
        const car = models.filter((car) => car.model === searchData.model);
        if (car[0]) {
            setSelectedModelYears(car[0].years);
        }
    }, [searchData.model, models]);

    // Function leverages the component's state to control the form
    const handleChange = (e) => {
        const { name, value } = e.target;

        setSearchData((data) => ({
            ...data,
            [name]: value,
        }));
    };

    // Function that will run once the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/cars', searchData);

            setTableData(data);
        } catch (err) {
            setTableData({});
        }
    };

    return (
        <div className="search_group">
            <form onSubmit={handleSubmit}>
                <div className="select_field">
                    <label>Make</label>
                    <select id="makes" name="make" value={searchData.make} onChange={handleChange}>
                        <option value="">All makes</option>
                        <optgroup label="Popular makes">
                            <option value="acura">Acura</option>
                            <option value="audi">Audi</option>
                            <option value="bmw">BMW</option>
                            <option value="buick">Buick</option>
                            <option value="cadillac">Cadillac</option>
                            <option value="chevrolet">Chevrolet</option>
                            <option value="chrysler">Chrysler</option>
                            <option value="dodge">Dodge</option>
                            <option value="ford">Ford</option>
                            <option value="gmc">GMC</option>
                            <option value="honda">Honda</option>
                            <option value="hyundai">Hyundai</option>
                            <option value="infiniti">INFINITI</option>
                            <option value="jaguar">Jaguar</option>
                            <option value="jeep">Jeep</option>
                            <option value="kia">Kia</option>
                            <option value="land rover">Land Rover</option>
                            <option value="lexus">Lexus</option>
                            <option value="lincoln">Lincoln</option>
                            <option value="mazda">Mazda</option>
                            <option value="mercedes benz">Mercedes-Benz</option>
                            <option value="mitsubishi">Mitsubishi</option>
                            <option value="nissan">Nissan</option>
                            <option value="porsche">Porsche</option>
                            <option value="ram">RAM</option>
                            <option value="subaru">Subaru</option>
                            <option value="tesla">Tesla</option>
                            <option value="toyota">Toyota</option>
                            <option value="volkswagen">Volkswagen</option>
                            <option value="volvo">Volvo</option>
                        </optgroup>
                        <optgroup label="Other makes">
                            <option value="ac">AC</option>
                            <option value="alfa romeo">Alfa Romeo</option>
                            <option value="am_general">Am General</option>
                            <option value="american motors">American Motors</option>
                            <option value="aston martin">Aston Martin</option>
                            <option value="austin healey">Austin-Healey</option>
                            <option value="bentley">Bentley</option>
                            <option value="bugatti">Bugatti</option>
                            <option value="datsun">Datsun</option>
                            <option value="detomaso">DeTomaso</option>
                            <option value="delorean">Delorean</option>
                            <option value="eagle">Eagle</option>
                            <option value="fiat">FIAT</option>
                            <option value="ferrari">Ferrari</option>
                            <option value="fisker">Fisker</option>
                            <option value="genesis">Genesis</option>
                            <option value="geo">Geo</option>
                            <option value="hudson">Hudson</option>
                            <option value="hummer">Hummer</option>
                            <option value="international">International</option>
                            <option value="isuzu">Isuzu</option>
                            <option value="jensen">Jensen</option>
                            <option value="kaiser">Kaiser</option>
                            <option value="karma">Karma</option>
                            <option value="koenigsegg">Koenigsegg</option>
                            <option value="lamborghini">Lamborghini</option>
                            <option value="lotus">Lotus</option>
                            <option value="mg">MG</option>
                            <option value="mini">MINI</option>
                            <option value="maserati">Maserati</option>
                            <option value="maybach">Maybach</option>
                            <option value="mclaren">McLaren</option>
                            <option value="mercury">Mercury</option>
                            <option value="nash">Nash</option>
                            <option value="oldsmobile">Oldsmobile</option>
                            <option value="opel">Opel</option>
                            <option value="packard">Packard</option>
                            <option value="pagani">Pagani</option>
                            <option value="panoz">Panoz</option>
                            <option value="plymouth">Plymouth</option>
                            <option value="polestar">Polestar</option>
                            <option value="pontiac">Pontiac</option>
                            <option value="rolls royce">Rolls-Royce</option>
                            <option value="saab">Saab</option>
                            <option value="saturn">Saturn</option>
                            <option value="scion">Scion</option>
                            <option value="studebaker">Studebaker</option>
                            <option value="sunbeam">Sunbeam</option>
                            <option value="suzuki">Suzuki</option>
                            <option value="triumph">Triumph</option>
                            <option value="willys">Willys</option>
                            <option value="smart">smart</option>
                        </optgroup>
                    </select>
                </div>

                <div className="select_field">
                    <label>Model</label>
                    <select id="models" name="model" value={searchData.model} onChange={handleChange}>
                        <option value="">All models</option>
                        {models.map((car, idx) => (
                            <option key={car.model + idx} value={car.model}>
                                {car.model}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select_field">
                    <label>Year</label>
                    <select id="year" name="year" value={searchData.year} onChange={handleChange}>
                        <option value="">Any</option>
                        {selectedModelYears.map((year, idx) => (
                            <option key={year + idx} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select_field">
                    <label>Price</label>
                    <select id="make-model-max-price" name="budget" value={searchData.budget} onChange={handleChange}>
                        <option value="">No max price</option>
                        <option value="2000">$2,000</option>
                        <option value="4000">$4,000</option>
                        <option value="6000">$6,000</option>
                        <option value="8000">$8,000</option>
                        <option value="10000">$10,000</option>
                        <option value="15000">$15,000</option>
                        <option value="20000">$20,000</option>
                        <option value="25000">$25,000</option>
                        <option value="30000">$30,000</option>
                        <option value="35000">$35,000</option>
                        <option value="40000">$40,000</option>
                        <option value="45000">$45,000</option>
                        <option value="50000">$50,000</option>
                        <option value="60000">$60,000</option>
                        <option value="70000">$70,000</option>
                        <option value="80000">$80,000</option>
                        <option value="90000">$90,000</option>
                        <option value="100000">$100,000</option>
                        <option value="125000">$125,000</option>
                        <option value="150000">$150,000</option>
                        <option value="175000">$175,000</option>
                    </select>
                </div>

                <button className="search_btn" type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchGroup;
