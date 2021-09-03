import React , {useEffect , useState} from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import './theme/antd.scss'
import {Row ,Col , Typography, Button , Select} from 'antd'
import {toPng} from 'html-to-image'
 

const {Text} = Typography
const {Option} = Select

function App(){

  const [image , setImage] = useState(1)
  const [primaryColor , setPrimaryColor] = useState('#ca893f');
  const [secondaryColor , setSecondaryColor] = useState('#f0e760');
  const [backgroundColor , setBackgroundColor] = useState('#ffffff');
  const [hat , setHat] = useState(0);
  const [cigarette , setCigarette] = useState(0);

  const [primaryColors , setPrimaryColors] = useState(['#f44336' , '#e91e63' , '#9c27b0' , '#673ab7' , '#3f51b5' , '#2196f3'  , '#00bcd4' ,'#009688' ]);
  const [secondaryColors , setSecondaryColors] = useState([  '#cddc39' , '#ffeb3b' , '#ffc107' , '#ff9800' , '#795548' , '#9e9e9e' , '#607d8b']);
  const [backgroundColors , setBackgroundColors] = useState(['#ffffff' , '#444444' , '#a28eec' , '#e4a786' , '#66e16a']);
  const [hats , setHats] = useState([0]);
  const [cigarettes , setCigarettes] = useState([0]);

  const [spin , setSpin] = useState(false);
  const [stop , setStop] = useState(false);
  const [totalCount , setTotalCount] = useState(0);
  const [downloadedCount , setDownloadedCount] = useState(0);


  const images = [
    {
      id: 1,
      name: 'seahourse'
    },
  ]

  const hatsOptions = [
    {
      id: 1,
      name: 'Magic'
    },
    {
      id: 2,
      name: 'Cowboy 1'
    },
    {
      id: 3,
      name: 'Cowboy 2'
    },
    {
      id: 4,
      name: 'Christmas'
    },
  ]

  const cigarettesOptions = [
    {
      id: 1,
      name: 'cig 1'
    },
    {
      id: 2,
      name: 'pip 1'
    },
  ]



  useEffect(()=>{
    let root = document.documentElement;
    let pColor = hexToRgb(primaryColor);
    let sColor = hexToRgb(secondaryColor);
    
    pColor = `${pColor[0]},${pColor[1]},${pColor[2]}`
    sColor = `${sColor[0]},${sColor[1]},${sColor[2]}`

    root.style.setProperty("--image-primary-color", pColor);
    root.style.setProperty("--image-secondary-color", sColor);
    root.style.setProperty("--image-background-color", backgroundColor);
  },[primaryColor , secondaryColor , backgroundColor])

  useEffect(()=>{
      let count = primaryColors.length * secondaryColors.length * backgroundColors.length * hats.length * cigarettes.length;
      setTotalCount(count);
  },[primaryColors , secondaryColors , backgroundColors , hats , cigarettes])



  const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

  const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
  }



  const generate = async ()=>{
    const images = document.getElementById('images');
    let root = document.documentElement;

    setSpin(true);

    let counter = 1;
          
    for(let b = 0 ; b < backgroundColors.length ; b++){       // backgorud color
      for(let p = 0 ; p < primaryColors.length ; p++){        // primary color
        for(let s = 0 ; s < secondaryColors.length ; s++){    // secondary color
          for(let h = 0 ; h < hats.length ; h++){             // hat
            for(let c = 0 ; c < cigarettes.length ; c++){     // cigarettes
                let background = backgroundColors[b];
                let primary = primaryColors[p];
                let secondary = secondaryColors[s];
                
                images.innerHTML = '';
                let pColor = hexToRgb(primary);
                let sColor = hexToRgb(secondary);
                
                pColor = `${pColor[0]},${pColor[1]},${pColor[2]}`
                sColor = `${sColor[0]},${sColor[1]},${sColor[2]}`
        
                root.style.setProperty("--image-primary-color", pColor);
                root.style.setProperty("--image-secondary-color", sColor);
                root.style.setProperty("--image-background-color", background);
    
                const imageBox = document.createElement('div');
                const image = document.createElement('div');
                const hat = document.createElement('div');
                const cig = document.createElement('div');

                imageBox.id = 'image-box'
                imageBox.className = 'image-box';
                image.className = 'image';
                hat.className = `hat-${hats[h]}`;
                cig.className = `cig-${cigarettes[c]}`;

                imageBox.appendChild(image);
                imageBox.appendChild(hat);
                imageBox.appendChild(cig);
                images.appendChild(imageBox);
                
                if(counter === 1){
                    await sleep(100);
                }
                download(counter);
                await sleep(100);
                setDownloadedCount(counter);
                await sleep(500);
                counter++;
            }
          }
        }
      }
    }

    setSpin(false);
    setStop(false);
  }

  const download = (counter)=>{
    toPng(document.getElementById('image-box')).then(dataUrl => {
      const link = document.createElement('a');
      link.download = `image-${counter}.png`;
      link.href = dataUrl;
      link.click();
    });
  }

  return(
    <div className={'App'}>


      <Row justify={'space-between'} className={'header-box'} align={'middle'} >
        <Col md={{span: 22}} className={'title-box'}>
          <Text className={'title'}>Crypto Zoo - Pixel Art</Text>
        </Col>
        <Col className={'icon-box'}>
           <i className="lab la-github icon"></i>
        </Col>
      </Row>


      <Row justify={'center'} className={'count-box'}>
        <Text className={'title'}>Total: {totalCount}</Text>
      </Row>


      <Row justify={'space-around'} align={'top'}>
        <Col md={{span: 4}}  className={'select-color-box'}>

          <Row align={'middle'} justify={'space-around'} >
            <Text className={'title'}>Primary Color</Text>
            <input type="color" className={'input'} value={primaryColor}  onChange={(e)=>{
                setPrimaryColor(e.target.value);
              }}/>
          </Row>
          <Row justify={'center'}>
            <Col md={{span: 18}}>
                <Button  className={'add-btn'} type={'primary'} block onClick={()=>{
                  setPrimaryColors([...primaryColors , primaryColor]);
                  setPrimaryColor('#ca893f');
                }} >Add Color</Button>
            </Col>
          </Row>
          <Row align={'middle'} justify={'center'} className={'colors-box'}>
            {primaryColors.map((color , index)=>{
                return(
                  <Col md={{span: 5}} key={index}
                    className={`color ${color === primaryColor ? 'active': ''}`}
                    style={{backgroundColor:color , height: '32px' , width: '100%'}}
                    onClick={()=>{
                      setPrimaryColor(color)
                    }}
                  >
                    <i className="las la-times icon" onClick={()=>{
                      let colors = [...primaryColors];
                      colors.splice(index , 1);
                      setPrimaryColors(colors);
                    }}></i>
                  </Col>
                )
              })}
          </Row>
        </Col>
        <Col md={{span: 4}}  className={'select-color-box'}>

            <Row align={'middle'} justify={'space-around'} >
              <Text className={'title'}>Secondary Color</Text>
              <input type="color" className={'input'} value={secondaryColor}  onChange={(e)=>{
                  setSecondaryColor(e.target.value);
                }}/>
            </Row>
            <Row justify={'center'}>
              <Col md={{span: 18}}>
                  <Button  className={'add-btn'} type={'primary'} block onClick={()=>{
                    setSecondaryColors([...secondaryColors , secondaryColor]);
                    setSecondaryColor('#f0e760');
                  }} >Add Color</Button>
              </Col>
            </Row>
            <Row align={'middle'} justify={'center'} className={'colors-box'}>
              {secondaryColors.map((color , index)=>{
                  return(
                    <Col md={{span: 5}} key={index}
                      className={`color ${color === secondaryColor ? 'active': ''}`}
                      style={{backgroundColor:color , height: '32px' , width: '100%'}}
                      onClick={()=>{
                        setSecondaryColor(color)
                      }}
                    >
                      <i className="las la-times icon" onClick={()=>{
                        let colors = [...secondaryColors];
                        colors.splice(index , 1);
                        setSecondaryColors(colors);
                      }}></i>
                    </Col>
                  )
                })}
            </Row>
          </Col>
        <Col md={{span: 4}}  className={'select-color-box'}>
            <Row align={'middle'} justify={'space-around'} >
              <Text className={'title'}>Background Color</Text>
              <input type="color" className={'input'} value={backgroundColor}  onChange={(e)=>{
                  setBackgroundColor(e.target.value);
                }}/>
            </Row>
            <Row justify={'center'}>
              <Col md={{span: 18}}>
                  <Button  className={'add-btn'} type={'primary'} block onClick={()=>{
                    setBackgroundColors([...backgroundColors , backgroundColor]);
                    setBackgroundColor('#ffffff');
                  }} >Add Color</Button>
              </Col>
            </Row>
            <Row align={'middle'} justify={'center'} className={'colors-box'}>
              {backgroundColors.map((color , index)=>{
                  return(
                    <Col md={{span: 5}} key={index}
                      className={`color ${color === backgroundColor ? 'active': ''}`}
                      style={{backgroundColor:color , height: '32px' , width: '100%'}}
                      onClick={()=>{
                        setBackgroundColor(color)
                      }}
                    >
                      <i className="las la-times icon" onClick={()=>{
                        let colors = [...backgroundColors];
                        colors.splice(index , 1);
                        setBackgroundColors(colors);
                      }}></i>
                    </Col>
                  )
                })}
            </Row>
        </Col>
        <Col md={{span: 4}} className={'options-box'} >  
          <Row align={'middle'} justify={'space-around'}>
            <Text className={'title'}>Hat</Text>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Cigarette"
              optionFilterProp="children"
              value={hat}
              onChange={(id)=>{
                  setHat(id);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={0}>Select a Hat</Option>
              {hatsOptions.map((item , index)=>{
                return(
                  <Option value={item.id} key={index}>{item.name}</Option>
                )
              })}
            </Select>
          </Row>
          <Row justify={'center'}>
              <Col md={{span: 18}}>
                  <Button  className={'add-btn'} type={'primary'} block onClick={()=>{
                    let isSelected = hats.find(e=>e === hat);
                    if(hat !== 0 && !isSelected){
                      setHats([...hats , hat]);
                      setHat(0);
                    }
                  }} >Add Hat</Button>
              </Col>
            </Row>
            <Row align={'middle'} justify={'center'} className={'items-box'}>
              {hats.map((item , index)=>{
                  if(item == 0){
                    return null
                  }
                  let selectItem = hatsOptions.find(e=>e.id === item);

                  return(
                    <Col md={{span: 10}} key={index}
                      className={`item ${selectItem.id === hat ? 'active': ''}`}
                      onClick={()=>{
                        setHat(item)
                      }}
                    >
                      <Text className={'name'}>{selectItem.name}</Text>
                      <i className="las la-times icon" onClick={()=>{
                        let array = [...hats];
                        array.splice(index , 1);
                        setHats(array);
                      }}></i>
                    </Col>
                  )
                })}
            </Row>
        </Col>
        <Col md={{span: 4}} className={'options-box'} >
          <Row align={'middle'} justify={'space-around'}>
            <Text className={'title'}>Cigarettes</Text>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a Cigarette"
              optionFilterProp="children"
              value={cigarette}
              onChange={(id)=>{
                  setCigarette(id);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={0}>Select a Cigarette</Option>
              {cigarettesOptions.map((item , index)=>{
                return(
                  <Option value={item.id} key={index}>{item.name}</Option>
                )
              })}
            </Select>
          </Row>
          <Row justify={'center'}>
              <Col md={{span: 18}}>
                  <Button  className={'add-btn'} type={'primary'} block onClick={()=>{
                    let isSelected = cigarettesOptions.find(e=>e === cigarette);
                    if(cigarette !== 0 && !isSelected){
                      setCigarettes([...cigarettes , cigarette]);
                      setCigarette(0);
                    }
                  }} >Add Cigarette</Button>
              </Col>
            </Row>
            <Row align={'middle'} justify={'center'} className={'items-box'}>
              {cigarettes.map((item , index)=>{
                  if(item == 0){
                    return null
                  }
                  let selectItem = cigarettesOptions.find(e=>e.id === item);

                  return(
                    <Col md={{span: 10}} key={index}
                      className={`item ${selectItem.id === cigarette ? 'active': ''}`}
                      onClick={()=>{
                        console.log(item);
                        setCigarette(item)
                      }}
                    >
                      <Text className={'name'}>{selectItem.name}</Text>
                      <i className="las la-times icon" onClick={()=>{
                        let array = [...cigarettes];
                        array.splice(index , 1);
                        setCigarettes(array);
                      }}></i>
                    </Col>
                  )
                })}
            </Row>
        </Col>      
      </Row>


      <Row className={'images'} id={'images'}>
        <div className={'image-box'}>
          <div className={'image'}></div>
          <div className={`hat-${hat}`}></div>
          <div className={`cig-${cigarette}`}></div>
        </div>
      </Row>


      <Row justify={'center'}>
          <Col  className={'generate-btn-box'}>
              <Button loading={spin} onClick={generate} type={'primary'} block>
                {spin ? `Generating...  ${downloadedCount}/${totalCount}` : 'Generate'}
              </Button>
          </Col>
      </Row>
      



    </div>
  )
}



export default App;