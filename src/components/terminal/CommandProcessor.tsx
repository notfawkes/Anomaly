

const CommandProcessor = async (input: string): Promise<string[]> => {
  const command = input.toLowerCase().trim();
  const parts = command.split(' ');
  const mainCommand = parts[0];

  // Process different commands
  switch (mainCommand) {
    case 'help':
      return [
        'AVAILABLE COMMANDS:',
        '  help   - Show this help menu',
        '  status - Check system status',
        '  scan   - Scan for anomalies',
        '  connect - Connect to a temporal node',
        '  decrypt - Attempt to decrypt a node',
        '  solve  - Solve a puzzle or paradox',
        '  clear  - Clear terminal screen',
        '  exit   - Return to main menu',
        '  start  - Begin the anomaly quiz game' // 👈 added
      ];

    case 'status':
      return [
        'SYSTEM STATUS:',
        '  Core: ONLINE',
        '  Timeline Integrity: 23%',
        '  Detected Anomalies: 7',
        '  Resolved Anomalies: 0',
        '  Current Mission: Restore Echo Chamber node'
      ];

    case 'scan':
      if (parts[1] === '--anomalies') {
        return [
          'SCANNING FOR TEMPORAL ANOMALIES...',
          'SCAN COMPLETE. 3 CRITICAL ANOMALIES DETECTED:',
          '  - ECHO CHAMBER (LOCKED)',
          '  - PARADOX ENGINE (LOCKED)',
          '  - QUANTUM LOOP (LOCKED)',
          '',
          'USE "connect --node [node_name]" TO ESTABLISH CONNECTION'
        ];
      }
      return ['SPECIFY SCAN TYPE: --anomalies, --timeline, --integrity'];

    case 'connect':
      if (parts[1] === '--node' && parts[2]) {
        const node = parts[2].toLowerCase();
        if (node === 'echo_chamber') {
          return [
            'CONNECTING TO ECHO CHAMBER NODE...',
            'CONNECTION ESTABLISHED',
            'NODE STATUS: LOCKED',
            'ENCRYPTION DETECTED. USE "decrypt --node echo_chamber" TO PROCEED'
          ];
        } else if (node === 'temporal_core') {
          return [
            'CONNECTING TO TEMPORAL CORE...',
            'CONNECTION ESTABLISHED',
            'WARNING: CORE INSTABILITY DETECTED',
            'TIMELINE FRACTURES EXPANDING AT 0.37% PER HOUR',
            'IMMEDIATE ACTION REQUIRED'
          ];
        }
        return [
          `ATTEMPTING TO CONNECT TO ${parts[2].toUpperCase()}...`,
          'CONNECTION FAILED: NODE NOT FOUND OR INACCESSIBLE'
        ];
      }
      return ['USAGE: connect --node [node_name]'];

    case 'decrypt':
      if (parts[1] === '--node' && parts[2] === 'echo_chamber') {
        return [
          'INITIATING DECRYPTION SEQUENCE...',
          'ACCESS DENIED: SOLVE THE PARADOX TO PROCEED',
          '',
          'PARADOX PRESENTED:',
          '"This statement is false."',
          '',
          'USE "solve --paradox [your_answer]" TO ATTEMPT SOLUTION'
        ];
      }
      return ['USAGE: decrypt --node [node_name]'];

    case 'solve':
      if (parts[1] === '--paradox') {
        const answer = parts.slice(2).join(' ').toLowerCase();
        if (
          answer.includes('paradox') ||
          answer.includes('neither') ||
          answer.includes('both')
        ) {
          return [
            'PROCESSING SOLUTION...',
            'PARADOX RESOLUTION ACCEPTED',
            '',
            'ECHO CHAMBER DECRYPTION: 33% COMPLETE',
            'ADDITIONAL PARADOXES MUST BE SOLVED TO GAIN FULL ACCESS',
            '',
            'NEW PARADOX DETECTED:',
            '"The next statement is true. The previous statement is false."',
            '',
            'CONTINUE DECRYPTION SEQUENCE WHEN READY'
          ];
        }
        return [
          'PROCESSING SOLUTION...',
          'SOLUTION REJECTED',
          'HINT: CONSIDER THE NATURE OF SELF-REFERENCE AND TRUTH VALUES'
        ];
      }
      return ['USAGE: solve --paradox [your_answer]'];

    case 'clear':
      return ['__CLEAR__'];

    case 'exit':
      return [
        'DISCONNECTING FROM TERMINAL...',
        'RETURNING TO MAIN INTERFACE...',
        '__EXIT__'
      ];

    case 'start': // 👈 added new start command
      return [
        'INITIALIZING ANOMALY QUIZ GAME...',
        'SYSTEM MESSAGE: The quiz will now begin inside the anomaly.'
      ];

    default:
      return [
        `COMMAND NOT RECOGNIZED: "${input}"`,
        'TYPE "help" FOR AVAILABLE COMMANDS'
      ];
  }
};

export default CommandProcessor;
