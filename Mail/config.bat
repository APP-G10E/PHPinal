@echo off

REM Check if Conda is available
where conda >nul 2>&1
if %errorlevel% equ 0 (
    echo Conda found. Proceeding with creating and activating the environment.
    REM Create a new conda environment
    conda create -n configenv python=3.7
    REM Activate the conda environment
    call conda activate configenv
    REM Run the Python script
    echo Running Python script.
    python config.py
    REM Deactivate the conda environment
    echo Deactivating conda environment.
    call conda deactivate
    REM Delete the conda environment
    echo Removing conda environment.
    conda env remove -n configenv -y
) else (
    REM If conda is not found, print an error message in red
    echo No Python path found
    exit /b 1
)
