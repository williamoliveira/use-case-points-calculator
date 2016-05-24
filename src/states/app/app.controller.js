var templates = {
    navbar: require('./navbar.tpl.html')
};

/** @ngInject */
module.exports = function (){

    var vm = this;

    vm.templates = templates;
    
    vm.model = {};

    vm.factors = {
        actors: {
            simple: {
                name: "Simples (software externo via API bem definida)",
                weight: 1
            },
            medium: {
                name: "Médio (software externo via protocolo. Ex. HTTP, IP, FTP, etc)",
                weight: 2
            },
            complex: {
                name: "Complexo (usuário humano via interface gráfica)",
                weight: 3
            }
        },
        useCases: {
            simple: {
                name: 'Simples (1-3 transações)',
                weight: 5
            },
            medium: {
                name: 'Médio (4-7 transações)',
                weight: 10
            },
            complex: {
                name: 'Complexo (8+ transações)',
                weight: 15
            }
        },
        technicalFactors: {
            distributedSystem: {
                name: 'Sistema distribuído',
                weight: 2
            },
            performanceObjectives: {
                name: 'Tempo de resposta',
                weight: 2
            },
            endUserEfficiency: {
                name: 'Eficiência',
                weight: 1
            },
            complexProcessing: {
                name: 'Processamento complexo',
                weight: 1
            },
            reusableCode: {
                name: 'Código reusável',
                weight: 1
            },
            easyInstall: {
                name: 'Facilidade de instalação',
                weight: 0.5
            },
            easyUse: {
                name: 'Facilidade de uso',
                weight: 0.5
            },
            portable: {
                name: 'Portabilidade',
                weight: 2
            },
            easyChange: {
                name: 'Facilidade de mudança',
                weight: 1
            },
            concurrentUse: {
                name: 'Concorrência',
                weight: 1
            },
            specialSecurity: {
                name: 'Recursos de segurança',
                weight: 1
            },
            accessForThirdParties: {
                name: 'Acessível por terceiros ',
                weight: 1
            },
            trainingNeeds: {
                name: 'Requer treinamento especial',
                weight: 1
            }
        },
        environmentalFactors: {
            familiarWithDevelopmentProcess: {
                name: 'Facilidade com RUP ou outro processo formal',
                weight: 1.5
            },
            applicationExperience: {
                name: 'Experiência com a aplicação em desenvolvimento',
                weight: 0.5
            },
            objectOrientedExperience: {
                name: 'Experiência em Orientação a Objetos',
                weight: 1
            },
            leadAnalystCapability: {
                name: 'Presença de analista experiente',
                weight: 0.5
            },
            motivation: {
                name: 'Motivação ',
                weight: 1
            },
            stableRequirements: {
                name: 'Requisitos estáveis',
                weight: 2
            },
            partTimeStaff: {
                name: 'Desenvolvedores em meio-expediente',
                weight: -1
            },
            difficultProgrammingLanguage: {
                name: 'Linguagem de programação difícil',
                weight: -1
            }
        }
    };

    vm.hoursFields = [{
        key: 'avgHours',
        type: 'input',
        templateOptions: {
            label: 'Média de horas por Ponto de Caso de Uso',
            type: 'number',
            min: 0
        },
        defaultValue: 20
    }];

    vm.getUUCW = getUUCW;
    vm.getUAW = getUAW;
    vm.getUUCP = getUUCP;
    vm.getTCF = getTCF;
    vm.getEF = getEF;
    vm.getUCP = getUCP;
    vm.getAvgHours = getAvgHours;

    buildFields('actors');
    buildFields('useCases');
    buildFields('technicalFactors', 5);
    buildFields('environmentalFactors', 5);


    function getUUCW() {
        return calcWeights('useCases');
    }

    function getUAW() {
        return calcWeights('actors');
    }

    function getUUCP() {
        return getUAW() + getUUCW();
    }

    function getTCF() {
        return 0.6 + (0.01 * calcWeights('technicalFactors'));
    }

    function getEF() {
        return 1.4 + (-0.03 * calcWeights('environmentalFactors'));
    }

    function getUCP() {
        return getTCF() * getEF() * getUUCP();
    }

    function getAvgHours() {
        return getUCP() * vm.model.hours.avgHours;
    }

    function calcWeights(factorName) {

        var total = 0.0;

        for(var itemName in vm.model[factorName]){

            if(!vm.model[factorName].hasOwnProperty(itemName)){
                continue;
            }

            var itemValue = vm.model[factorName][itemName];
            total += itemValue * vm.factors[factorName][itemName].weight;
        }

        return total;
    }

    function buildFields(factorName, max) {

        var varFields = factorName + 'Fields';
        var maxValue = max || Infinity;

        vm[varFields] = [];

        for(var factorItemName in vm.factors[factorName]){

            if(!vm.factors[factorName].hasOwnProperty(factorItemName)){
                continue;
            }

            var factor = vm.factors[factorName][factorItemName];


            vm[varFields].push({
                key: factorItemName,
                type: 'input',
                className: 'col-md-4',
                templateOptions: {
                    label: factor.name,
                    type: 'number',
                    min: 0,
                    max: maxValue
                },
                defaultValue: 0
            });
        }
    }
};