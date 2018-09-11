import React, { Component } from "react";
import firebase from "firebase";
import "./App.css";
import Merchant from "./Merchant";
import Item from "./Item";
import ItemDescription from "./ItemDescription";
import Town from "./Town";

const widthRightPanel = 300;
const heightHeader = 100;
const heightBottomPanel = 150;
// const gridHeight = 20;
// const gridWidth = 20;
const gridLength = 20;
const gridDimension = Math.floor((window.innerHeight - 250) / gridLength);
const widthLeft =
    window.innerWidth -
    gridLength * gridDimension -
    gridLength * 2 -
    widthRightPanel;
const heightLeft = gridLength * gridDimension;
// const gridDimension = 30;

const styledSignOut = {
    float: "right",
};

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledMapButtons = {
    border: "1px solid blue",
    width: `${gridDimension * 3 + 3}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledGridContent = {
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
};

const styledGrid = {
    border: "1px solid pink",
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledRow = {
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledHeader = {
    borderBottom: "1px solid black",
    width: "100%",
    height: `${heightHeader}px`,
};

const styledMap = {
    border: "1px solid grey",
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension * gridLength}px`,
    display: "inline-block",
    float: "left",
};

const styledBottomPanel = {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    borderTop: "1px solid black",
    width: `${window.innerWidth - widthRightPanel}px`,
    height: `${heightBottomPanel}px`,
};

const styledRightPanel = {
    position: "absolute",
    top: `${heightHeader}px`,
    right: "0px",
    borderLeft: "1px solid black",
    width: `${widthRightPanel}px`,
    height: `${window.innerHeight - heightHeader}px`,
};

const styledCharPanel = {
    borderBottom: "1px solid black",
    width: "100%",
    height: "33%",
};

const styledItemsPanel = {
    borderBottom: "1px solid black",
    width: "100%",
    height: "33%",
};

const styledChatPanel = {
    width: "100%",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
};

const items = [
    {
        name: "tamere",
        description: "moncul",
        icon: "potion_1",
    },
    {
        name: "tamere",
        description: "mes fesses",
        icon: "potion_1",
    },
];

const merchantList = [
    {
        name: "alchimiste Debron",
        description: "Homme sénil",
        shop_description: "Vieux bâtiment",
        icon: "alchimist",
        items,
    },
];

const towns = [
    {
        name: "Hameau de mes fesses",
        positionX: 6,
        positionY: 6,
        icon: "big_town",
        merchants: merchantList,
    },
];

const gridTypes = [
    {
        name: "Fog",
        background: "black",
    },
    {
        name: "Ocean",
        background: "blue",
    },
    {
        name: "Forest",
        icon: "forest.png",
    },
];

class App extends Component {
    state = {
        isAuth: true,
        errorMessage: "",
        isItemShowed: false,
        itemsList: [],
        isItemDescriptionShowed: false,
        itemToDescribe: {},
        isMerchantsShowed: false,
        merchantsList: [],
        email: "",
        password: "",
        isAdmin: true,
    };

    componentDidMount() {}

    onChange = (name, value) => {
        const obj = {};
        obj[name] = value;
        this.setState(state => ({
            ...state,
            ...obj,
        }));
    };

    signIn = () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(state => ({
                    ...state,
                    isAuth: true,
                }));
            })
            .catch(error => {
                // Handle Errors here.
                this.setState(
                    state => ({
                        ...state,
                        errorMessage: error.message,
                    }),
                    () => {
                        setTimeout(() => {
                            this.setState(state => ({
                                ...state,
                                errorMessage: "",
                            }));
                        }, 5000);
                    },
                );
            });
    };

    signUp = () => {
        const { email, password } = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(state => ({
                    ...state,
                    isAuth: true,
                }));
            })
            .catch(error => {
                // Handle Errors here.
                this.setState(
                    state => ({
                        ...state,
                        errorMessage: error.message,
                    }),
                    () => {
                        setTimeout(() => {
                            this.setState(state => ({
                                ...state,
                                errorMessage: "",
                            }));
                        }, 5000);
                    },
                );
            });
    };

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                this.setState(state => ({
                    ...state,
                    isAuth: false,
                }));
            })
            .catch(error => {
                // An error happened.
                console.log("error", error);
            });
    };

    getMerchantsFromTown = merchants => {
        return merchants.map(item => {
            return <Merchant {...item} showItems={this.showItems} />;
        });
    };

    getItemsFromMerchant = itemsFormMerchant => {
        return itemsFormMerchant.map(itemFromMerchant => {
            return (
                <Item
                    {...itemFromMerchant}
                    showItemDescription={this.showItemDescription}
                />
            );
        });
    };

    getGridTypes = grids => {
        return grids.map(gridType => {
            if(gridType.background)
            {
                return (
                    <div
                        style={{
                            ...styledGrid,
                            border: "none",
                            borderLeft: "1px solid black",
                            backgroundColor: gridType.background,
                        }}
                    />
                );
            }
            else if(gridType.icon)
            {
                return (
                    <div
                        style={{
                            ...styledGrid,
                            border: "none",
                            borderLeft: "1px solid black",
                            backgroundImage:  `url(${gridType.icon})`,
                            backgroundSize: 'cover',
                        }}
                    />
                );
            }
            return null;
        });
    };

    showMerchantList = list => {
        this.setState(state => ({
            ...state,
            isMerchantsShowed: true,
            merchantsList: list,
        }));
    };

    showItems = list => {
        this.setState(state => ({
            ...state,
            isItemShowed: true,
            itemsList: list,
        }));
    };

    showItemDescription = itemToDescribe => {
        this.setState(state => ({
            ...state,
            isItemDescriptionShowed: true,
            itemToDescribe: itemToDescribe,
        }));
    };

    createGrid = positionX => {
        const table = [];

        for (let i = 0; i < gridLength; i++) {
            table.push(
                <div style={styledGrid}>
                    {towns.map(town => {
                        if (
                            positionX === town.positionX &&
                            i === town.positionY
                        ) {
                            return (
                                <Town
                                    {...town}
                                    showMerchantList={this.showMerchantList}
                                />
                            );
                        }
                        return null;
                    })}
                </div>,
            );
        }
        return table;
    };

    createTable = () => {
        const table = [];
        for (let i = 0; i < gridLength; i++) {
            table.push(<div style={styledRow}>{this.createGrid(i)}</div>);
        }
        return table;
    };

    render() {
        const {
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isMerchantsShowed,
            merchantsList,
            isAuth,
            errorMessage,
            email,
            password,
            isAdmin,
        } = this.state;
        return (
            <div className="App">
                {!isAuth && (
                    <div>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => {
                                this.onChange(e.target.name, e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => {
                                this.onChange(e.target.name, e.target.value);
                            }}
                        />
                        <button onClick={this.signIn}>Sign In</button>
                        <button onClick={this.signUp}>Sign Up</button>

                        {errorMessage !== "" && <div>{errorMessage}</div>}
                    </div>
                )}
                {isAuth && (
                    <div>
                        <div style={styledHeader}>
                            <div style={styledBoxHeader}>Header</div>
                            <button
                                style={styledSignOut}
                                onClick={this.signOut}
                            >
                                Sign Out
                            </button>
                        </div>
                        <div style={styledMap}>{this.createTable()}</div>
                        {isAdmin && (
                            <div style={styledMapSide}>
                                <div style={styledBoxHeader}>
                                    Modifier la carte
                                </div>
                                <div style={styledMapButtons}>
                                    {this.getGridTypes(gridTypes)}
                                </div>
                            </div>
                        )}
                        {!isAdmin && (
                            <div>
                                {isMerchantsShowed && (
                                    <div style={styledMapSide}>
                                        <div style={styledBoxHeader}>
                                            Liste des quêtes
                                        </div>
                                    </div>
                                )}
                                {isMerchantsShowed && (
                                    <div style={styledMapSide}>
                                        <div style={styledBoxHeader}>
                                            Liste des marchands
                                        </div>
                                        {this.getMerchantsFromTown(
                                            merchantsList,
                                        )}
                                    </div>
                                )}
                                {isItemShowed && (
                                    <div style={styledMapSide}>
                                        <div style={styledBoxHeader}>
                                            {" "}
                                            Liste des objets{" "}
                                        </div>
                                        {this.getItemsFromMerchant(itemsList)}
                                    </div>
                                )}
                                {isItemDescriptionShowed && (
                                    <div style={styledMapSide}>
                                        <div style={styledBoxHeader}>
                                            Description
                                        </div>
                                        <ItemDescription {...itemToDescribe} />
                                    </div>
                                )}
                            </div>
                        )}
                        <div style={styledRightPanel}>
                            <div style={styledCharPanel}>
                                <div style={styledBoxHeader}>Personnage</div>
                            </div>
                            <div style={styledItemsPanel}>
                                <div style={styledBoxHeader}>Items/Or</div>
                            </div>
                            <div style={styledChatPanel}>
                                <div style={styledBoxHeader}>Chat</div>
                            </div>
                        </div>
                        <div style={styledBottomPanel}>
                            <div style={styledBoxHeader}>Cameras</div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
