// This is the example of component to be instrumented using the function
// class Component {
//    constructor() { 
//       this.failedEvents = []
//       setTimeout(this.init, 100);
//     } 
 
//   init() {
//       if(!sendAnalyticsEvent(event)){
//           this.failedEvents.push(sendAnalyticsEvent(event))
//       }else {
//           sendAnalyticsEvent(event)
//       }
//    }
// } 

const AnalyticsContext = createContext({})

const AnalyticsPageProvider = ({children}) => {
    const [failedEvents, setFailedEvents] = useState({})
    const [serverAwake, setServerAwake] = useState(true)
    const [serverWakeUpAttempts, setServerWakeUpAttempts] = useState(0)
    // Your goal is to implement the sendAnalyticsEvent(event) API function.
    const sendAnalyticsEvent = async (event) => {
        if(serverAwake) {
            const failedEvent = null
            let res
            try {
                res = await doRequest(event)
            } catch(err) {
                if(!isDuplicate){
                    setFailedEvents([...failedEvents, event])   
                }
                setServerWakeUpAttempts(serverWakeUpAttempts + 1)
                // network error, server down
                // noon, servers come back up 1pm. 
                console.log(err)
            }  
        }else {
           setServerWakeUpAttempts(serverWakeUpAttempts + 1)
           setFailedEvents([...failedEvents, event])
        }
    
    // const sendFailedEvents = () => {
    //     let interval = setInterval(() => {
    //         if(failedEvents) {
    //             for(let i = 0; i<failedEvents.length; i++){
    //                 sendAnalyticsEvent(failedEvents[i])
    //             }
    //         }
    //     }, 5000)
    // }
    
    useEffect(() => {
        fetch('https://server-status')
            .then((resp) => {
                setServerAwake(resp)
            }).catch((err) => {
                console.log('some other err occured')
            })
        
        const interval = setInterval(() => {
            if(failedEvents) {
                for(let i = 0; i<failedEvents.length; i++){
                    sendAnalyticsEvent(failedEvents[i])
                }
            }
        }, 500000)
        return () => clearInterval(interval)
        
        
    }, [serverWakeUpAttempts])
    // TODO: add your code here

    // example event
    // {
    // "type": "pageView",
    // "data": {
    //   "userId": "abc123"
    // }
    }
    
    const values = {
        sendAnalyticsEvent
    }

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    )
}

const Application = () => (
        <AnalyticsPageProvider>
            <FoodOrderApplication />
        </AnalyticsPageProvider>
    )

const FoodOrderApplication = () => {
    const {
       sendAnalyticsEvent 
    } = useContext(AnalyticsContext)
    
    const handleOrder = () => {
        const event = {
            "type": "maincourse",
            "data": {
                name: "pizza"
            }
        }
    
        sendAnalyticsEvent(event)
    }
    
    return (
        <div>
            <button onClick={handleOrder} type="button"> Order Food </button>
        </div>
    )
}
// Your goal is to implement the sendAnalyticsEvent(event) API function.
const sendAnalyticsEvent = async (event) => {
    let failedEvent = null
    let res
    try {
        res = await doRequest(event)
    } catch(err) {
        failedEvent = event
        // network error, server down
        // noon, servers come back up 1pm. 
        console.log(err)
    }
    
    return failedEvent
// TODO: add your code here

// example event
// {
// "type": "pageView",
// "data": {
//   "userId": "abc123"
// }
}

// const sendAnalyticsEvent = (event) => {
// // TODO: add your code here

// // example event
// // {
// // "type": "pageView",
// // "data": {
// //   "userId": "abc123"
// // }
// }

// When using an API, you would need to POST those analytics events down to the backend via the /analytics end-point. 
// To get you started we’ve developed a simple mock of the server API abstraction. Feel free to change this implementation.
const doRequest = (event) => new Promise((resolve, reject) => resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    }));
