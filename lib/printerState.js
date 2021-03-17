// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const PrinterStates = {
  READY: 'READY',
  PREPARING: 'PREPARING',
  PRINTING: 'PRINTING',
  PAUSED: 'PAUSED',
  POSTPROCESSING: 'POSTPROCESSING',
  CANCELING: 'CANCELING',
  COMPLETED: 'COMPLETED',
  UPDATING: 'UPDATING',
  LOCAL: 'LOCAL',
  ERROR: 'ERROR',
  DISCONNECTED: 'DISCONNECTED',
  DOOR: 'DOOR',
  CLEAR: 'CLEAR'
};

// For any of these states, the printer is printing and cannot start a new job yet
const PrintingStates = [
  PrinterStates.PREPARING,
  PrinterStates.PREPARING,
  PrinterStates.PRINTING,
  PrinterStates.PAUSED,
  PrinterStates.POSTPROCESSING,
  PrinterStates.CANCELING,
  PrinterStates.LOCAL
];

const InterventionRequiredStates = [
  PrinterStates.ERROR,
  PrinterStates.DISCONNECTED,
  PrinterStates.DOOR,
  PrinterStates.CLEAR
];

const PrinterStatus = {
  [PrinterStates.READY]: 'Printer is idle and ready to print',
  [PrinterStates.PREPARING]: 'Printer is preparing a cloud print',
  [PrinterStates.PRINTING]: 'Printer is printing a cloud print',
  [PrinterStates.PAUSED]: 'Printer has paused a print',
  [PrinterStates.POSTPROCESSING]: 'Printer is performing post-printing operations',
  [PrinterStates.CANCELING]: 'Printer is canceling a print from the cloud',
  [PrinterStates.COMPLETE]: 'Printer has completed a print from the cloud',
  [PrinterStates.UPDATING]: 'Printer is updating its software',
  [PrinterStates.LOCAL]: 'Printer is executing a local print job',
  [PrinterStates.ERROR]: 'Printer is in an error state and requires manual intervention',
  [PrinterStates.DISCONNECTED]: 'Controller is disconnected from the printer',
  [PrinterStates.DOOR]: 'Printer\'s door/hood is open; unable to start or resume a print',
  [PrinterStates.CLEAR]: 'Build platform contains a print which must be removed before a new print can be started'
};

const utils = {
  isReady: (state) => state === PrinterStates.READY,
  isPrinting: (state) => PrintingStates.includes(state),
  isInterventionRequired: (state) => InterventionRequiredStates.includes(state),
  isDoorOpen: (state) => state === PrinterStates.DOOR
};

module.exports = {
  PrinterStates,
  PrintingStates,
  InterventionRequiredStates,
  PrinterStatus,
  ...utils
};
