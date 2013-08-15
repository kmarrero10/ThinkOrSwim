#############SWING BOX BREAKOUT############
# WGRIFFITH2 (C) 2013
# STRATEGY IS BUILT ON THE FOLLOWING PREMISE(S)
# DAVAS BOX BREAKOUT - NEW THREE DAY HIGH WITH HEAVY VOLUME
# NON-OVER-BOUGHT STOCK BASED ON STOCHASTIC SLOW

INPUT SIDE = "LONG";
INPUT PERIODS = 3; # LAST NUMBER OF CANDLESTICKS
INPUT ATR = 3.5; # ATR FACTOR
INPUT OVER_BOUGHT = 50;
INPUT AVGVOL = 50;

# DEFINING ENTRY
DEF KPERIOD = 14;
DEF DPERIOD = 3;
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD));
#DEF SLOWLINE = ROUND(SIMPLEMOVINGAVG(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

DEF MCO = MCCLELLANOSCILLATOR()>0 OR MCCLELLANOSCILLATOR() > AVERAGE(MCCLELLANOSCILLATOR()[3]);
DEF NEW_PERIOD = PERIODS - 1;
DEF CHANGE = CLOSE > CLOSE[1];
DEF BUYSIGNAL = VOLUMEAVG(LENGTH = AVGVOL) > VOLUMEAVG(LENGTH = AVGVOL).VOLAVG AND FASTLINE > FASTLINE[1] AND CHANGE IS TRUE;
DEF THREEOUT = (THREEINSIDEUP() IS TRUE OR THREEOUTSIDEUP() IS TRUE OR THREEWHITESOLDIERS() IS TRUE);
DEF ENTRY = (BUYSIGNAL IS TRUE OR THREEOUT IS TRUE) AND FASTLINE < OVER_BOUGHT AND MCO IS TRUE;

# DEFINING EXIT
DEF ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = PERIODS)[1];
DEF STOPLOSS = (LOW <= ROLLINGLOW AND ENTRY IS FALSE);
DEF TRGT_ROLLINGLOW = LOWEST(DATA = LOW(), LENGTH = PERIODS+4)[0];
DEF TARGET = HIGH > TRGT_ROLLINGLOW + ATRWILDER()*ATR;
DEF EXIT = (TARGET IS TRUE OR STOPLOSS IS TRUE);

DEF SHARES = ROUND(12000 / CLOSE);

#LONG POSITION:
ADDORDER(ORDERTYPE.BUY_TO_OPEN, ENTRY IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(0), ARROWCOLOR = GETCOLOR(0), NAME = "LE");
ADDORDER(ORDERTYPE.SELL_TO_CLOSE, EXIT IS TRUE, TRADESIZE = SHARES, TICKCOLOR = GETCOLOR(1), ARROWCOLOR = GETCOLOR(1), NAME = "LX", PRICE = OHLC4);

##################################################
